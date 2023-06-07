'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import { Flex, VStack } from '@chakra-ui/layout';
import { usePathname } from 'next/navigation';

import { HiBookOpen } from 'react-icons/hi2';
import { Text, Heading } from '@chakra-ui/react';
import clsx from 'clsx';

function AdminLayout({ children }) {
  const menu = false;
  const [minimize, setMinimize] = useState(false);

  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
  }, [pathname]);

  const menus = [
    {
      name: 'Dashboard',
      menu: 'dashboard',
      path: '/admin/dashboard',
    },
    {
      name: 'Product',
      menu: 'product',
      path: '/admin/product',
    },
    {
      name: 'Berita',
      menu: 'berita',
      path: '/admin/berita',
    },
  ];
  return (
    <Flex h="100%" flexDir={'row'} overflow={'hidden'} w={'100%'}>
      <Flex
        transform={{
          base: menu ? 'translate(0, 0)' : 'translate(-100%, 0)',
          lg: 'translate(0, 0)',
        }}
        transition="transform 0.3s ease"
        w={{
          base: '100%',
          lg: minimize ? '5%' : '15%',
        }}
        h={{
          base: '100vh',
          lg: '100%',
        }}
        position={{
          base: 'absolute',
          lg: 'static',
        }}
        zIndex={{
          base: 5,
          lg: 1,
        }}
        flexDir={'column'}
        justifyContent={'item-start'}
        color={'#fffff'}
        background="linear-gradient(to bottom, #007aff, #00b4ff)"
      >
        <Flex flexDir={'column'} align={'flex-start'} pt={5} h="100%">
          <Box h={'90%'} w="100%">
            <Text as="p" fontSize={'xl'} marginLeft={2} color={'#AAAEB1'}>
              Menu
            </Text>

            <VStack spacing={3} marginTop={5} w={'100%'}>
              {menus?.map((item, key) => (
                <Link
                  className={clsx(` font-bold w-full    py-3 `, {
                    'text-[#4975D3] bg-[#e0e7ee]':
                      item.menu === pathname.split('/')[2],
                    'text-[#AAAEB1]': item.menu !== pathname.split('/')[2],
                    'flex items-center justify-center': minimize,
                    ' pl-2': !minimize,
                  })}
                  key={key}
                  href={item.path}
                >
                  <Flex alignItems={'center'}>
                    {' '}
                    <HiBookOpen
                      className={clsx({
                        'text-[#4975D3] bg-[#e0e7ee]':
                          item.menu === pathname.split('/')[2],
                        'text-[#AAAEB1]': item.menu !== pathname.split('/')[2],
                        'h-8 w-8': minimize,
                        'h-6 w-6': minimize,
                      })}
                    />
                    {!minimize && <Text marginLeft={2}> {item.name}</Text>}
                  </Flex>
                </Link>
              ))}
            </VStack>
          </Box>
          <Box>
            <button onClick={() => setMinimize(!minimize)}>X</button>
          </Box>
        </Flex>
      </Flex>
      <Flex
        overflow={'scroll'}
        w={{
          base: '100%',
          lg: minimize ? '95%' : '85%',
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
