"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckIcon, ArrowRightIcon } from "lucide-react"

type Step = {
  id: number
  label: string
  field: string
  placeholder: string
}

const baseSteps: Step[] = [
  { id: 1, label: "ФИО", field: "fullName", placeholder: "Ваше ФИО" },
  { id: 2, label: "Номер телефона", field: "phone", placeholder: "+375 (__) ___-__-__" },
  { id: 3, label: "Почта", field: "email", placeholder: "you@example.com" },
]

export type MultiStepFormValues = {
  fullName: string
  phone: string
  email: string
  meetingAt?: string
}

function toLocalDateKey(value: Date) {
  // YYYY-MM-DD in local time
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, "0")
  const day = String(value.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatSlotLabel(value: Date) {
  return value.toLocaleString("ru-RU", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function MultiStepForm({
  onComplete,
  includeReservationStep,
  apartmentId,
}: {
  onComplete?: (values: MultiStepFormValues) => void
  includeReservationStep?: boolean
  apartmentId?: number
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [reservedIso, setReservedIso] = useState<string[]>([])
  const [selectedMeetingAt, setSelectedMeetingAt] = useState<string>("")
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const steps = useMemo(() => {
    if (!includeReservationStep) return baseSteps
    return [
      ...baseSteps,
      { id: 4, label: "Дата и время", field: "meetingAt", placeholder: "" },
    ]
  }, [includeReservationStep])

  useEffect(() => {
    if (!includeReservationStep) return
    if (!apartmentId || Number.isNaN(Number(apartmentId))) return

    let active = true
    const load = async () => {
      setIsLoadingSlots(true)
      try {
        const res = await fetch(`/api/reservation-slots`)
        const data = await res.json().catch(() => [])
        if (!active) return
        if (res.ok && Array.isArray(data)) {
          setReservedIso(data.map((d) => String(d)))
        } else {
          setReservedIso([])
        }
      } finally {
        if (active) setIsLoadingSlots(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [includeReservationStep, apartmentId])

  const reservedSet = useMemo(() => new Set(reservedIso), [reservedIso])

  const availableSlotsByDay = useMemo(() => {
    if (!includeReservationStep) return []

    const now = new Date()
    const start = new Date(now)
    start.setMinutes(0, 0, 0)

    const days = 14
    const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18]
    const out: Array<{ dateKey: string; slots: Array<{ iso: string; label: string; disabled: boolean }> }> = []

    for (let d = 0; d < days; d += 1) {
      const day = new Date(start)
      day.setDate(start.getDate() + d)
      const dateKey = toLocalDateKey(day)

      const slots = hours.map((h) => {
        const slot = new Date(day)
        slot.setHours(h, 0, 0, 0)
        const iso = slot.toISOString()
        const disabled = slot.getTime() < now.getTime() || reservedSet.has(iso)
        return { iso, label: formatSlotLabel(slot), disabled }
      })

      out.push({ dateKey, slots })
    }

    return out
  }, [includeReservationStep, reservedSet])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
      onComplete?.({
        fullName: String(formData.fullName || ""),
        phone: String(formData.phone || ""),
        email: String(formData.email || ""),
        ...(includeReservationStep ? { meetingAt: selectedMeetingAt } : {}),
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100
  const isReservationStep = includeReservationStep && currentStepData?.field === "meetingAt"
  const canGoNext = isReservationStep
    ? Boolean(selectedMeetingAt)
    : Boolean(formData[currentStepData.field]?.trim())

  if (isComplete) {
    return (
      <div className="w-full max-w-sm">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/20 p-12 backdrop-blur">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="relative flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground/10 bg-foreground/5">
              <CheckIcon
                className="h-8 w-8 text-foreground animate-in zoom-in duration-500 delay-200"
                strokeWidth={2.5}
              />
            </div>
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-medium tracking-tight text-balance">Спасибо!</h2>
              <p className="text-sm text-muted-foreground/80">{formData.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-10 flex items-center justify-center gap-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <button
              onClick={() => index < currentStep && setCurrentStep(index)}
              disabled={index > currentStep}
              className={cn(
                "group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-700 ease-out",
                "disabled:cursor-not-allowed",
                index < currentStep && "bg-foreground/10 text-foreground/60",
                index === currentStep && "bg-foreground text-background shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]",
                index > currentStep && "bg-muted/50 text-muted-foreground/40",
              )}
              type="button"
            >
              {index < currentStep ? (
                <CheckIcon className="h-4 w-4 animate-in zoom-in duration-500" strokeWidth={2.5} />
              ) : (
                <span className="text-sm font-medium tabular-nums">{step.id}</span>
              )}
              {index === currentStep && (
                <div className="absolute inset-0 rounded-full bg-foreground/20 blur-md animate-pulse" />
              )}
            </button>
            {index < steps.length - 1 && (
              <div className="relative h-[1.5px] w-12">
                <div className="absolute inset-0 bg-[rgba(207,207,207,0.4)]" />
                <div
                  className="absolute inset-0 bg-foreground/30 transition-all duration-700 ease-out origin-left"
                  style={{
                    transform: `scaleX(${index < currentStep ? 1 : 0})`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8 overflow-hidden rounded-full bg-muted/30 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-foreground/60 to-foreground transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-8">
        <div key={currentStepData.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={currentStepData.field} className="text-lg font-medium tracking-tight">
              {currentStepData.label}
            </Label>
            <span className="text-xs font-medium text-muted-foreground/60 tabular-nums">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          {!isReservationStep ? (
            <div className="relative group">
              <Input
                id={currentStepData.field}
                type={currentStepData.field === "email" ? "email" : "text"}
                placeholder={currentStepData.placeholder}
                value={formData[currentStepData.field] || ""}
                onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                autoFocus
                className="h-14 text-base transition-all duration-500 border-border/50 focus:border-foreground/20 bg-background/50 backdrop-blur"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground/80">
                Выберите удобное время встречи. Занятые слоты недоступны.
              </div>

              {isLoadingSlots ? (
                <div className="text-sm text-muted-foreground/80">Загружаем свободные слоты…</div>
              ) : (
                <div className="max-h-60 overflow-auto rounded-xl border border-border/50 bg-background/30 p-3 space-y-3">
                  {availableSlotsByDay.map((day) => (
                    <div key={day.dateKey} className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground/70">{day.dateKey}</div>
                      <div className="grid grid-cols-1 gap-2">
                        {day.slots.map((slot) => {
                          const active = selectedMeetingAt === slot.iso
                          return (
                            <button
                              key={slot.iso}
                              type="button"
                              disabled={slot.disabled}
                              onClick={() => setSelectedMeetingAt(slot.iso)}
                              className={cn(
                                "h-11 rounded-xl border text-sm px-3 text-left transition-all duration-300",
                                "disabled:opacity-40 disabled:cursor-not-allowed",
                                active
                                  ? "border-foreground/30 bg-foreground text-background"
                                  : "border-border/50 bg-background/50 hover:bg-muted/30",
                              )}
                            >
                              {slot.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="w-full h-12 group relative transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5"
          type="button"
        >
          <span className="flex items-center justify-center gap-2 font-medium">
            {currentStep === steps.length - 1 ? "Отправить" : "Далее"}
            <ArrowRightIcon
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 duration-300"
              strokeWidth={2}
            />
          </span>
        </Button>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full text-center text-sm text-muted-foreground/60 hover:text-foreground/80 transition-all duration-300"
            type="button"
          >
            Назад
          </button>
        )}
      </div>
    </div>
  )
}

