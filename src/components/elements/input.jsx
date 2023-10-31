import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { joinClassnames } from "@/utils/global";

const Input = (props) => {
  const {
    label,
    placeholder,
    prefix,
    suffix,
    type,
    name,
    id,
    onChange,
    value,
    disabled = false,
    size = "default",
    transparent = false,
    readonly,
    min,
    max,
    ...otherInputProps
  } = props;

  const [inputType, setInputType] = useState(type);
  const [eyeOpen, setEyeOpen] = useState(false);

  const _handlePasswordTypeOpen = useCallback(() => {
    if (eyeOpen) {
      setInputType(type);
      setEyeOpen(false);
    } else {
      setInputType("text");
      setEyeOpen(true);
    }
  }, [type, eyeOpen, setInputType, setEyeOpen]);

  return (
    <div>
      <label htmlFor={id || name}>
        <p className="font-semibold text-sm">{label}</p>
        <div
          className={joinClassnames([
            "border-b border-neutral-10 w-full flex items-center mt-1 overflow-hidden",
            inputSizes[size],
            disabled
              ? "bg-slate-200"
              : transparent
              ? "bg-trasparent"
              : "bg-white",
          ])}
        >
          {prefix ? <div className="pl-4">{prefix}</div> : null}
          <input
            id={id || name}
            type={inputType}
            placeholder={placeholder}
            onChange={(e) => {
              e.stopPropagation();
              const { value } = e.target;

              if (inputType === "number") {
                if (value < min) return;
                if (value > max) return;
              }

              onChange(e);
            }}
            min={min}
            max={max}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readonly}
            {...otherInputProps}
            className="focus:outline-none h-full w-full px-0 py-2 bg-transparent !text-left"
          />
          {type === "password" ? (
            <button
              type="button"
              className="pr-0"
              onClick={_handlePasswordTypeOpen}
            >
              {eyeOpen ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </button>
          ) : suffix ? (
            <div className="pr-1">{suffix}</div>
          ) : null}
        </div>
      </label>
    </div>
  );
};

const inputSizes = {
  default: "h-11",
  medium: "h-9 text-sm",
  small: "h-8 text-xs",
  large: "h-12 ",
};

Input.defaultProps = {
  label: "",
  placeholder: "Type here",
  type: "text",
  prefix: null,
  suffix: null,
  name: "",
  id: "",
  onChange: () => {},
  disabled: false,
  size: "medium",
  transparent: false,
  readonly: false,
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.any.isRequired,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["default", "small", "large", "medium"]),
  transparent: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default Input;
