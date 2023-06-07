import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
export function UpdateButton({ ...props }) {
  return <IconButton  icon={<EditIcon />} colorScheme="blue" {...props} />;
}


export function DeleteButton({...props}){
    return <IconButton  icon={<DeleteIcon />} colorScheme="red" {...props}  />
}