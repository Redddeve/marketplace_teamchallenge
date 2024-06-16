import { FC } from 'react';

import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { Seller, SellerStatus } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface InputProps {
  text: string | undefined;
  title: string;
  className?: string;
}

const InputImitator: FC<InputProps> = (props) => {
  const { text, title, className } = props;

  return (
    <HStack gap="2" className="w-full">
      <Text Tag="p" text={title} size="md" color="gray-light" />
      <div
        className={`flex items-center px-4 ${className} py-1 w-full bg-selected-dark rounded-lg min-h-12`}
      >
        <Text Tag="span" text={text} size="sm" color="white" />
      </div>
    </HStack>
  );
};

interface Props {
  sellerId: string;
  closeForm: () => void;
  showActiveteForm: () => void;
}

const SellerInfoForm: FC<Props> = (props) => {
  const { sellerId, closeForm, showActiveteForm } = props;

  const dispatch = useAppDispatch();

  const { data: seller, isLoading } = useAxios<Seller>(
    `${ApiRoutes.SELLER_INFO}?sellerId=${sellerId}`,
  );

  const setStatus = async (status: SellerStatus) => {
    try {
      await $api.patch(`${ApiRoutes.USER}/${sellerId}/status`, {
        accountStatus: status,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      dispatch(fetchAllSellers({}));
      closeForm();
      if (status === 'active') {
        showActiveteForm();
      }
    }
  };

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <HStack gap="5" className="w-full">
      <div className="w-full bg-dark-grey rounded-2xl px-4 py-6">
        <Text
          Tag="h3"
          text={`Заявка на реєстрацію компанії ID ${sellerId} `}
          size="xl"
          color="gray-light"
          className="mb-5"
        />
        <VStack justify="between" gap="4" className="w-full">
          <HStack gap="5" className="w-full">
            <InputImitator text={seller?.legalName} title="Юридична назва компанії" />
            <InputImitator text={seller?.city} title="Місто, область" />
            <InputImitator text={seller?.idStateRegister} title="ЄДРПОУ" />
          </HStack>
          <HStack gap="5" className="w-full">
            <InputImitator text={seller?.legalAddress} title="Юридична адреса" />
            <InputImitator text={seller?.cityIndex} title="Індекс" />
            <InputImitator text={seller?.identificNumber} title="ІПН" />
          </HStack>
        </VStack>
        <Text Tag="h3" text="Контакти" size="xl" color="gray-light" className="my-5" />
        <HStack gap="5" className="w-full">
          {seller?.contacts.map((item, i) => (
            <VStack key={i} gap="4" className="w-full">
              <InputImitator text={item.phone} title="Teлефон" />
              <InputImitator text={item.person} title="Контактна особа" />
            </VStack>
          ))}
        </HStack>
        <Text
          Tag="h3"
          text="Інші методи зв’язку"
          size="xl"
          color="gray-light"
          className="mb-5 mt-9"
        />
        <HStack gap="5" className="w-full">
          {seller?.communication.map((item, i) => (
            <VStack key={i} gap="4" className="w-full">
              <InputImitator text={item.messenger} title="" />
              <InputImitator text={item.phone} title="" />
            </VStack>
          ))}
        </HStack>
      </div>
      <div className="w-full bg-dark-grey rounded-2xl px-4 py-6">
        <div className="w-full">
          <Text
            Tag="h3"
            text="Опис компанії"
            size="xl"
            color="gray-light"
            className="mb-5"
          />
          <InputImitator text={seller?.descriptCompany} title="" className="!py-4" />
        </div>
        <div>
          <Text
            Tag="h3"
            text="Інформація про компанію, доступна на сайті для всіх користувачів"
            size="xl"
            color="gray-light"
            className="mb-5 mt-9"
          />
          <InputImitator text={seller?.generalName} title="Назва компанії" />
          <Text
            Tag="h3"
            text="Контакти для зв'язку з клієнтами"
            size="xl"
            color="gray-light"
            className="my-5"
          />
          <HStack gap="5" className="w-full">
            {seller?.communication.map((item, i) => (
              <VStack key={i} gap="4" className="w-full">
                <InputImitator text={item.messenger} title="" />
                <InputImitator text={item.phone} title="" />
              </VStack>
            ))}
          </HStack>
        </div>
      </div>

      <VStack gap="5" justify="end" className="w-full">
        <Button
          onClick={() => setStatus('close')}
          variant="light-gray"
          className="max-w-[360px] h-12 w-full"
        >
          Відхилити
        </Button>
        <Button
          onClick={() => setStatus('active')}
          variant="primary"
          className="max-w-[360px] h-12 w-full"
        >
          Погодити заявку
        </Button>
      </VStack>
    </HStack>
  );
};

export default SellerInfoForm;
