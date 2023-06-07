import {
  
  Input,
  
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";

export default function InputDate({ value, name, onBlur, onChange, isInvalid, ...props }) {
  return (
    <ReactDatePicker
      {...props}
      customInput={<Input size="md"  isInvalid={isInvalid} />}
      wrapperClassName="custom-datepicker-wrapper"
      maxDate={new Date()}
      className="w-[296px] custom-datepicker"
      placeholderText="dd-mm-yyyy"
      dateFormat="dd-MM-yyyy"
      // selected={values.date ? new Date(values.date) : null}
      selected={value}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      
      // onChange={(e) => setFieldValue("date", e)}
    />
  );
}
