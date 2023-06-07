import React from "react";
import clx from "clsx";
import PropTypes from "prop-types";
// import { CalendarIcon, XIcon } from '@heroicons/react/outline';
import dynamic from "next/dynamic";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
const DynamicComponentWithNoSSR = dynamic(
  () => import("@hassanmojab/react-modern-calendar-datepicker"),
  { ssr: false }
);

function InputRangeDate({
  error,
  disabled,
  size = "base",
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  style = {},
  onClear = () => {},
  isClear = false,
  ...props
}) {
  let classNames = clx(
    `appearance-none transition-all duration-300 ease-in-out rounded  px-3 text-gray-800  leading-tight outline-none  w-full  focus:border-2  focus:border-blue-500`,
    {
      "opacity-75 cursor-not-allowed": disabled,
      "border border-red-400": error,
      "border border-gray-300": !error,
      "h-8 text-xs": size === "sm",
      "h-10 text-sm": size == "base",
      "h-12 text-base": size == "lg",
    }
  );

  const renderCustomInput = ({ ref }) => {
    let tanggal = value?.from
      ? `${value.from ? format(new Date(value.from), "dd-MM-yyyy") : ""} s/d ${
          value.to ? format(new Date(value.to), "dd-MM-yyyy") : ""
        }`
      : "";
    return (
      <div className="relative z-0">
        <input
          name={name}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          readOnly
          ref={ref}
          onBlur={onBlur}
          className={classNames}
          value={tanggal}
          style={style}
        />

        <div
          className="absolute text-gray-500 w-10  right-0 top-0 flex justify-center items-center h-full cursor-pointer"
          onClick={onClear}
        >
          {isClear ? (
            <p className="w-5 h-5 text-gray-300">2</p>
          ) : (
            <p className="w-5 h-5 text-gray-300">3</p>
          )}
        </div>
      </div>
    );
  };

  function parseValue(ISODate) {
    if (!ISODate) {
      return null;
    }
    let originalDate = parseISO(ISODate);

    return {
      year: originalDate.getFullYear(),
      month: originalDate.getMonth() + 1,
      day: originalDate.getDate(),
    };
  }

  return (
    <div>
      <DynamicComponentWithNoSSR
        onChange={(val, test) => {
          let from =
            val.from != null
              ? format(
                  new Date(val.from?.year, val.from?.month - 1, val.from?.day),
                  "yyyy-MM-dd"
                )
              : null;
          let to =
            val.to != null
              ? format(
                  new Date(val.to?.year, val.to?.month - 1, val.to?.day),
                  "yyyy-MM-dd"
                )
              : null;

          onChange({ from, to });
        }}
        value={{ from: parseValue(value?.from), to: parseValue(value?.to) }}
        colorPrimary="#0EA5E9"
        colorPrimaryLight="#E0F2FE"
        renderInput={renderCustomInput}
        slideAnimationDuration="0.3s"
        inputPlaceholder="Select a day"
        shouldHighlightWeekends
        calendarClassName="datepicker-calendar"
        inputClassName="datepicker-input z-50 w-full" 
        {...props}
      />
    </div>
  );
}

InputRangeDate.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "base", "lg"]),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.any,
};

export default InputRangeDate;
