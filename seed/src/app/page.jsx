// project import
import GuestGuard from 'utils/route-guard/GuestGuard';
import Login from 'views/pages/authentication/Login';

// ==============================|| Home PAGE ||============================== //

export default function HomePage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
