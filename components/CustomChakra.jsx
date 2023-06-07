'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'


export default function CustomChakra({children}){
    const theme = extendTheme({
        components: {
          
        },
      })
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}