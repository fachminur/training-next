"use client";
import React from "react";
import { Form, Formik, useFormik, FormikProvider } from "formik";
import useProductService from "@/service/productServices";
import { HiDocumentAdd} from 'react-icons/hi';
import { GiCancel} from 'react-icons/gi';
import * as Yup from "yup";
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
import CurrencyInput from "@/components/CurenncyInput";
import InputDate from "@/components/InputDate";
import { FcAddImage } from "react-icons/fc";

const CreateProductSchema = Yup.object({
  name: Yup.string().nullable().required("Wajib"),
  cost: Yup.number().required("Wajib"),
  description: Yup.string().required("Wajib"),
  category: Yup.string().required("Wajib Pilih"),
  openDate: Yup.string().required("Wajib Pilih"),
});

const CreateProductForm = ({ onClose }) => {
  const { useCreateProduct } = useProductService();
  const { mutate, isLoading } = useCreateProduct();
  const onSubmit = async (values, { resetForm }) => {
    // await createProduct(values, resetForm);

    await mutate(values, {
      onSuccess: () => {
        resetForm();
        onClose();
      },
    });
    console.log(createProduct.isSuccess);
  };

  const initialValues = {
    name: "",
    description: "",
    openDate: "",
    cost: "",
    category: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: CreateProductSchema,
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
      <Flex align={"center"} justify={"center"}>
        
        <Container>
          <Heading size={"lg"} marginBottom={5} color="#38A169">
            Tambah Product
          </Heading>
          <Form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isInvalid={errors?.cost}>
                <FormLabel color="#38A169" htmlFor="cost" fontWeight="semibold">
                  Nama Product
                </FormLabel>
                <CurrencyInput
                  id="cost"
                  isInvalid={errors.cost}
                  value={values.cost}
                  onChange={(e) => {
                    setFieldValue(`cost`, Number(e.value) || null);
                  }}
                  onBlur={() => formik.setFieldTouched("cost")}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.cost}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.openDate}>
                <FormLabel
                  color="#38A169"
                  htmlFor="openDate"
                  fontWeight="semibold"
                >
                  Tanggal
                </FormLabel>
                <InputDate
                  value={values.openDate ? new Date(values.openDate) : null}
                  name="openDate"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("openDate",e)}
                  isInvalid={errors.openDate}
                />
                <FormErrorMessage fontWeight="bold">
                  {errors?.openDate}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.name}>
                <FormLabel color="#38A169" htmlFor="name" fontWeight="semibold">
                  Nama Product
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Ketikname"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors?.name}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.category}>
                <FormLabel color="#38A169" htmlFor="category" fontWeight="semibold">
                  Kategori
                </FormLabel>
                <Select
                  id="category"
                  type="text"
                  value={values.category}
                  onChange={handleChange}
                  placeholder="Pilih"
                >
                  <option value={'handphone'}>Handphone</option>
                  <option value={'tv'}>TV</option>
                  <option value={'motor'}>Motor</option>
                </Select>

                <FormErrorMessage fontWeight="bold">
                  {errors?.category}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.description}>
                <FormLabel
                  color="#38A169"
                  htmlFor="description"
                  fontWeight="semibold"
                >
                  Deskripsi
                </FormLabel>
                <InputGroup>
                  <Textarea
                    id="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Ketikname"
                  />
                </InputGroup>

                <FormErrorMessage fontWeight="bold">
                  {errors?.description}
                </FormErrorMessage>
              </FormControl>

             <Flex gap={5} w={'100%'}>
            
              
              <Button
                onClick={onClose}
                type="button"
                width={"100%"}
                colorScheme="red"
                leftIcon={<GiCancel/>}
               
              >
                Tutup
              </Button>
              <Button
                isDisabled={isLoading}
                type="submit"
                width={"100%"}
                colorScheme="green"
                leftIcon={<HiDocumentAdd/>}
              >
                {isLoading ? <Spinner /> : "Create"}
              </Button>
             </Flex>
            </VStack>
          </Form>
        </Container>
      </Flex>
    </FormikProvider>
  );
};

export default CreateProductForm;
