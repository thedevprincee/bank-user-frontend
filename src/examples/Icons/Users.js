
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { FaUsers } from 'react-icons/fa';

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Users() {
  return (
    <FaUsers />
  );
}

// Setting default values for the props of Office
Users.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Users.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Users;
