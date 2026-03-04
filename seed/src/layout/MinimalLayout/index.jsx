import PropTypes from 'prop-types';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function MinimalLayout({ children }) {
  return <>{children}</>;
}

MinimalLayout.propTypes = { children: PropTypes.node };
