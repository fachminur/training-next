import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input
} from "@chakra-ui/react";
import React from "react";

export default function DrawerFilter({isOpen, onOpen, onClose, title, children}) {

  const btnRef = React.useRef();

  return (
    <>
     
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader px={5}>{title}</DrawerHeader>

          <DrawerBody px={5}>
          {children}
          </DrawerBody>

         
        </DrawerContent>
      </Drawer>
    </>
  );
}
