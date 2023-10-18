
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { GiMoneyStack } from 'react-icons/gi';

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Deposit() {
  return (
    <GiMoneyStack />
  );
}

// Setting default values for the props of Office
Deposit.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Deposit.propTypes = {
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

export default Deposit;
