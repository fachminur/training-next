'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from '@/hook/useAuthAxios';
import { useSession } from 'next-auth/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Spinner,
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { formatDate, formatDateInd, formatDateServer } from '@/utils/date';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import useDebounce from '@/hook/useDebounce';
import { useEffect } from 'react';
import useNotification from '@/hook/useNotification';
import Pagination from '@/components/Pagination';

function Page() {
  const axiosClient = useAxiosAuth();
  const { data: session } = useSession();

  const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const debouncedValue = useDebounce(keyword, 1000, setPage);
  const { toastSuccess, toastError } = useNotification();

  const { data, isLoading, isFetching } = useQuery(
    ['/product/list', { page, pageSize, q: debouncedValue }],
    () =>
      axiosClient.get('/product/list', {
        params: { page, pageSize, q: keyword },
      }),
    {
      select: (response) => response.data,
      staleTime: 1000 * 60 * 60,
      enabled: session?.user?.accessToken !== undefined,
    }
  );

  useEffect(() => {
    console.log('datalist', data);
    // toastSuccess('data');
    // data.data.filter((item) => item.name === 'yariz');
  }, [data, toastSuccess]);

  return (
    <div className="h-full w-full p-10">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </Box>
        <Spacer />
        <Box p="2">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Cari ..."
            />
          </InputGroup>
        </Box>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Image</Th>
              <Th>Nama</Th>
              <Th>Kategori</Th>
              <Th>Tanggal</Th>
              <Th isNumeric>Harga</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>

          <Tbody>
            {/* {!isFetching && data.data.length === 0 && (
              <Tr>
                <Td colSpan={10}>
                  <Center>Data Tidak Ditemukan</Center>
                </Td>
              </Tr>
            )}
            */}
            {isFetching && (
              <Tr>
                <Td colSpan={10}>
                  <Center>
                    <Spinner />
                  </Center>
                </Td>
              </Tr>
            )}
            {
              /*!isFetching && */
              data &&
                data.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{(page - 1) * pageSize + index + 1}</Td>
                    <Td>{item.image || '-'}</Td>
                    <Td>{item.name || '-'}</Td>
                    <Td>{item.description || '-'}</Td>
                    <Td>{formatDateInd(item.openDate) || '-'}</Td>
                    <Td isNumeric>{item.cost}</Td>
                    <Td>aksi</Td>
                  </Tr>
                ))
            }
          </Tbody>

          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
        total={data?.pagination.total}
      />
    </div>
  );
}

export default Page;
