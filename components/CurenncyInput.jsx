import { NumericFormat } from "react-number-format";
import { Input } from "@chakra-ui/react";
export default function CurrencyInput({
  onChange,
  onBlur,
  value,
  isInvalid,
  ...props
}) {
  return (
    <NumericFormat
      placeholder="Rp. 000"
      size="sm"
      style={{
        borderRadius: "8px",
      }}
      //   variant="custom"
      className="py-5 border rounded-3xl"
      value={value}
      onValueChange={onChange}
      onBlur={onBlur}
      //   onValueChange={(e) => {
      //     setFieldValue(`harga`, Number(e.value) || null);
      //   }}
      //   onBlur={() => formik.setFieldTouched("harga")}
      isInvalid={isInvalid}
      customInput={Input}
      prefix="Rp. "
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      allowNegative={false}
      allowLeadingZeros={false}
      {...props}
    />
  );
}
