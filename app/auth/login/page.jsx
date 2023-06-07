'use client';

import React from 'react';

import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Box, Center, VStack, useToast } from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';
import { loginService } from '@/services/authService';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
  Heading,
  Grid,
} from '@chakra-ui/react';
import { useEffect } from 'react';
// import { json } from 'stream/consumers';

const LoginSchema = Yup.object({
  email: Yup.string()
    .nullable()
    .required('Tidak boleh kosong')
    .email('Format email tidak benar'),
  password: Yup.string()
    .min(8, 'Minimal 8 karakter')
    .nullable()
    .required('Tidak boleh kosong'),
});

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);

  const [show, setShow] = React.useState(false);

  // ...
  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log('form submitted', values);
      const response = await loginService(values);

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      // console.log(localStorage.getItem('accessToken'));

      await signIn('credentials', {
        email: response.data.user.email,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        name: response.data.user.name,
        picture: response.data.user.picture,
        role: response.data.user.role,
        id: response.data.user.id,
        users: JSON.stringify(response.data.user),
        redirect: true,
      });

      toast({
        title: 'Login success.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log('error', error.response);
      error.response.status === 422
        ? toast({
            title: error.response.data.status,
            description: error.response.data.msg,
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          })
        : toast({
            title: 'Kesalahan',
            description: 'Server error',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
    } finally {
      console.log('finally');
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    resetForm,
  } = formik;

  // Fungsi untuk menampilkan pesan kesalahan saat respons gagal login diterima
  useEffect(() => {
    if (session)
      if (session.user.users.role == 'admin') {
        router.push('/admin');
      } else {
        router.push('/members');
      }
  }, [session, router]);

  return (
    <Center axis="both" h="100vh">
      <Box w={{ base: '90%', sm: '90%', md: '80%', lg: '50%', xl: '30%' }}>
        <Heading marginBottom={5} size={'lg'} color="#38A169">
          Login Form
        </Heading>
        {JSON.stringify(values)}
        {JSON.stringify(errors)}

        <FormikProvider value={values}>
          <form onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Ketik email"
                />

                <FormErrorMessage fontWeight="bold">
                  {errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  color="#38A169"
                  htmlFor="password"
                  fontWeight="semibold"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setFieldValue('password', e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                    type={show ? 'text' : 'password'}
                    placeholder="************"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage fontWeight="bold">
                  {errors?.password}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="button"
                width={'100%'}
                color={'white'}
                backgroundColor={'red'}
                onClick={() => signIn()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                width={'100%'}
                color={'white'}
                backgroundColor={'#38A169'}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Login
              </Button>
              <Button colorScheme="gray" leftIcon={<FcGoogle />}>
                Sign Google
              </Button>
            </VStack>
          </form>
        </FormikProvider>
      </Box>
    </Center>
  );
}
