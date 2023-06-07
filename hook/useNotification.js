import { useToast } from '@chakra-ui/react';

export default function useNotification() {
  const toast = useToast({ position: 'top-right' });

  function toastSuccess(msg = 'Berhasil') {
    toast({
      title: 'Success',
      description: msg,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  function toastWarning(msg = 'Perhatian') {
    toast({
      title: 'Warning',
      description: msg,
      status: 'warning',
      duration: 9000,
      isClosable: true,
    });
  }

  function toastDanger(msg = 'Perhatian') {
    toast({
      title: 'Danger',
      description: msg,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

  function toastInfo(msg = 'Perhatian') {
    toast({
      title: 'Info',
      description: msg,
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  }

  return { toastSuccess, toastDanger, toastInfo, toastWarning };
}
