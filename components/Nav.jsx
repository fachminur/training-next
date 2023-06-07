'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import { TfiClose } from 'react-icons/tfi';
import { Avatar, Box, Flex, VStack, useBoolean } from '@chakra-ui/react';

const Nav = () => {
  const router = useRouter();

  const { data: session } = useSession();

  // const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useBoolean();

  return (
    <nav className="flex-between w-full shadow-sm h-full overflow-hidden  bg-white py-3 px-5">
      {/* {JSON.stringify(session.user.users)} */}
      <section>
        <Link href="/" className="flex gap-2 flex-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            BPKP Training
          </h1>
        </Link>
      </section>

      <Flex align={'center'} flexDir={'row'} spacing="10">
        <Box>
          {/* {toggleDropdown.toString()} */}
          <div className="flex gap-3 md:gap-5" hidden={session ? false : true}>
            <button onClick={setToggleDropdown.toggle} type="button">
              <Avatar name={session?.user?.users?.name} />
            </button>
            {toggleDropdown && (
              <div className="dropdown_dekstop">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={setToggleDropdown.off}
                >
                  My Profile
                </Link>

                <button className="mt-5 w-full black_btn" n>
                  {session?.user?.users?.name}
                </button>
                <button className="mt-5 w-full black_btn" n>
                  <span className="capitalize">
                    {' '}
                    Login As {session?.user?.users?.role}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // setToggleDropdown(false);
                    setToggleDropdown.off;
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <button
            hidden={session ? true : false}
            type="button"
            onClick={() => {
              router.push('/auth/login');
            }}
            className="black_btn"
          >
            Login
          </button>
        </Box>
        <Box
          display={{
            base: 'block',
            lg: 'none',
          }}
          marginLeft={2}
        ></Box>
      </Flex>
    </nav>
  );
};

export default Nav;
