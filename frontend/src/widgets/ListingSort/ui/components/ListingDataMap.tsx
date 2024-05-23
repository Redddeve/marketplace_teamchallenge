import OfferController from '@/pages/AdminPage/ui/Tabs/ManagingOffers/OfferController';

import useAxios from '@/shared/lib/hooks/useAxios';
import { Text } from '@/shared/ui/Text';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { FC } from 'react';
import { Product } from '@/enteties/Product';

interface ListingDataMapProps {
  isCheckedDescending: boolean;
  isCheckedAscending: boolean;
  id: string;
}
interface ApiProductsResponse {
  products: Product[];
}

const ListingDataMap: FC<ListingDataMapProps> = ({
  id,
  isCheckedDescending,
  isCheckedAscending,
}) => {
  const { data } = useAxios<ApiProductsResponse>(
    `${ApiRoutes.PRODUCTS}?sellerId=${id}&sortDirection=${isCheckedAscending ? 1 : isCheckedDescending ? -1 : '--'}`,
  );
  
console.log(data);


  const editHandler = () => {};
  const publishHandler = () => {};
  const rejectHandler = () => {};
  const blockHandler = () => {};
  return data?.products ? (
    data?.products.map((elem) => {
      return (
        <tr
          key={elem?._id}
          className="h-[76px] w-full mb-1 even:bg-selected-dark odd:bg-transparent rounded-2xl"
        >
          <td aria-label="Дата" className="pl-2.5 rounded-l-2xl">
            <Text Tag="p" text={elem?.created_at.slice(0, 10).split('-').reverse().join('.')} size="md" color="white" />
          </td>
          <td aria-label="ID Продавця" className="pl-2.5">
            <Text Tag="p" text={elem?.sellerId} size="md" color="white" />
          </td>
          <td aria-label="Назва товару" className="pl-2.5">
            <Text Tag="p" text={elem?.name} size="md" color="white" />
          </td>
          <td aria-label="ID Товару" className="pl-2.5">
            <Text Tag="p" text={elem?._id} size="md" color="white"/>
          </td>
          <td aria-label="Ціна" className="pl-2.5">
            <Text Tag="p" text={elem?.price + 'грн'} size="md" color="white" />
          </td>
          <td aria-label="Дії" className="rounded-r-2xl">
            <OfferController
              editHandler={editHandler}
              publishHandler={publishHandler}
              rejectHandler={rejectHandler}
              blockHandler={blockHandler}
            />
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td>Not Found</td>
    </tr>
  );
};

export default ListingDataMap;
