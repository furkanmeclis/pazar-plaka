import {
  Box,
  Input,
  Button,
  Center,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
export default function Home() {
  const toast = useToast();
  const [plaka, setPlaka] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (String(plaka).trim().length === 0)
      return toast({
        title: 'Uyarı',
        description: 'Lütfen Plaka Giriniz',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    setLoading(true);
    fetch('/api/sorgu', {
      method: 'POST',
      body: JSON.stringify({ plaka }),
    })
      .then((r) => r.json())
      .then(({ message, isnew }) => {
        if (isnew) {
          toast({
            title: 'Araç Kaydı Yapıldı',
            description: message,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Araç Kaydı Bulundu',
            description: 'Araç Kaydı Var',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch(() =>
        toast({
          title: 'Bir Sorun Oluştu',
          description: 'Servis İle Bağlantı Kurulamadı',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      )
      .finally(() => {
        setLoading(false);
        setPlaka('');
      });
  };
  return (
    <>
      <Box mx="4" my="6">
        <Box display="flex" maxW="200px" h="50px">
          <Box
            bg="blue"
            textColor="white"
            fontWeight="semibold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            roundedLeft="md"
          >
            TR
          </Box>
          <Box
            flex="3"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            roundedRight="md"
            textColor="black"
            fontSize="xl"
            fontWeight="semibold"
          >
            {plaka}
          </Box>
        </Box>
        <Divider my="4" />
        <form onSubmit={submit}>
          <Input
            placeholder="Plaka"
            value={plaka}
            disabled={loading}
            autocomplete="off"
            onChange={({ target }) =>
              setPlaka(
                String(target.value)
                  .replaceAll(' ', '')
                  .replaceAll('-', '')
                  .toLocaleUpperCase()
              )
            }
          />
          <Center>
            <Button type="submit" mt="3" colorScheme="blue" isLoading={loading}>
              Sorgula
            </Button>
          </Center>
        </form>
      </Box>
    </>
  );
}
