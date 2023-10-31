import PropTypes from "prop-types";
import { joinClassnames } from "@/utils/global";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const {
    children,
    onClick,
    type,
    variant,
    disabled,
    full,
    size,
    to,
    classes,
    replace = false,
    loading = false,
  } = props;

  if (type === "nav-link" && to) {
    return (
      <NavLink
        to={to}
        replace={replace}
        disabled={disabled}
        className={joinClassnames([
          buttonSizes[size],
          "font-semibold rounded-md flex items-center justify-center gap-1",
          buttonVariants[variant],
          full ? "w-full" : "w-fit",
        ])}
      >
        {children}
      </NavLink>
    );
  }

  if (type === "link" && to) {
    return (
      <a
        href={to}
        disabled={disabled}
        className={joinClassnames([
          buttonSizes[size],
          "font-semibold rounded-md flex items-center justify-center gap-1",
          buttonVariants[variant],
          full ? "w-full" : "w-fit",
        ])}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={joinClassnames([
        buttonSizes[size],
        "font-semibold rounded-md flex items-center justify-center gap-1 duration-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-50 disabled:border-gray-300 disabled:hover:shadow-none",
        buttonVariants[variant],
        full ? "w-full" : "w-fit",
        classes,
      ])}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {!loading ? children : "Please wait..."}
    </button>
  );
};

const buttonVariants = {
  primary:
    "bg-g-800 text-white hover:text-white border border-g-800 hover:bg-g-800/90 hover:shadow-[0_8px_16px_rgba(203,48,41,0.2)]",
  secondary:
    "bg-white text-g-800 hover:text-g-800 border border-g-800 hover:bg-slate-100",
  tertiary:
    "bg-slate-200 text-slate-800 hover:text-slate-800 border border-slate-100",
  text: "text-g-800 hover:text-g-800 hover:underline border border-transparent",
  "danger-text":
    "text-red-500 hover:text-red-500 hover:underline border border-transparent",
  "danger-g-800":
    "bg-red-500 text-white hover:text-white border border-red-500 hover:bg-red-500/80",
  "danger-secondary":
    "bg-white text-red-500 hover:text-red-500border border-red-500",
};

const buttonSizes = {
  default: "h-11 px-6",
  medium: "h-9 px-5 text-sm",
  small: "h-8 px-5 text-xs",
  large: "h-12 px-6",
};

Button.defaultProps = {
  children: "",
  onClick: () => {},
  type: "button",
  disabled: false,
  variant: "primary",
  full: false,
  size: "default",
  to: "",
  classes: "",
  replace: false,
  loading: false,
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "link", "nav-link"]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "text",
    "danger-text",
    "danger-g-800",
    "danger-secondary",
  ]),
  full: PropTypes.bool,
  size: PropTypes.oneOf(["default", "small", "large", "medium"]),
  to: PropTypes.string,
  classes: PropTypes.string,
  replace: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
