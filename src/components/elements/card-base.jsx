import PropTypes from "prop-types";
import { joinClassnames } from "@/utils/global";

const CardBase = ({ children, className }) => {
  return (
    <div className={joinClassnames(["bg-white", className])}>{children}</div>
  );
};

CardBase.defaultProps = {
  children: <></>,
};

CardBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardBase;
