import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  Textarea,
  Spinner,
  Flex,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import InputRangeDate from "@/components/InputRange";
const FilterArtikel = ({ value, onSubmit, onReset, onClose }) => {
  const formik = useFormik({
    initialValues: {
      ...value,
    },
    onSubmit: onSubmit,

    enableReinitialize: true,
  });
  let {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,

    setFieldTouched,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={values}>
      {JSON.stringify(values)}
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel color="#38A169" htmlFor="name" fontWeight="semibold">
            Nama Product
          </FormLabel>
          <Input
            id="name"
            type="text"
            value={values?.name}
            onChange={handleChange}
            placeholder="Ketikname"
          />
        </FormControl>
        <FormControl>
          <FormLabel
            color="#38A169"
            htmlFor="description"
            fontWeight="semibold"
          >
            Nama Product
          </FormLabel>
          <Input
            id="description"
            type="text"
            value={values?.description}
            onChange={handleChange}
            placeholder="Ketikname"
          />
        </FormControl>

        <FormControl>
          <FormLabel
            color="#38A169"
            htmlFor="description"
            fontWeight="semibold"
          >
            Tanggal Rilis
          </FormLabel>

          <InputRangeDate
            id="openDate"
            value={{
              from: values.openDateFrom,
              to: values.openDateTo,
            }}
            onChange={(value) => {
              setFieldValue("openDateFrom", value.from);
              setFieldValue("openDateTo", value.to);
            }}
            placeholder={"Tanggal Rilis"}
            shouldHighlightWeekends
          />
        </FormControl>
        <Flex gap={2}>
          <Button
            onClick={() => {
              onReset();
              onClose();
            }}
            type="button"
          >
            Reset
          </Button>
          <Button type="submit">Filter</Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

export default FilterArtikel;
