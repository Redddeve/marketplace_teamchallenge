import { FC, useEffect, useState } from 'react';

import { Product, ProductCardSkeleton } from '@/enteties/Product';
import ProductCard from '@/enteties/Product/ui/ProductCard/ProductCard';
import { getWishlist, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ApiResponse {
  product: Product;
}

interface Props {}

const WishlistProfileTab: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector(getWishlist);
  const [products, setProducts] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await Promise.all(
          wishlist.map(async (id) => {
            try {
              const response = await $api.get(`${ApiRoutes.PRODUCTS}/${id}`);

              return response.data;
            } catch (error) {
              return null;
            }
          }),
        );

        const successfulProducts = productsData.filter((product) => product !== null);

        setProducts(successfulProducts);
      } catch (error) {
        /* eslint-disable no-console */
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [wishlist]);

  const handlerDeleteAll = async () => {
    try {
      const response = await $api.delete(`${ApiRoutes.WISHLIST}`);

      await dispatch(userActions.setUserWishList([]));

      return response;
    } catch (error) {
      console.error('Error Wishlist:', error);
    }
  };

  const renderSkeletons = () => (
    <VStack className="grid grid-cols-3 max-h-[920px] gap-6 overflow-auto pr-[31px]">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ProductCardSkeleton dark key={i} />
        ))}
    </VStack>
  );

  return (
    <HStack className="h-full w-full pt-6 pb-12 px-3 mb-12 bg-selected-dark rounded-2xl md:p-0 md:bg-inherit md:rounded-none">
      <Button
        disabled={isLoading}
        variant="clear"
        onClick={handlerDeleteAll}
        className="mb-4"
      >
        <Text Tag="span" text="Видалити все" size="lg" className="!text-disabled" />
      </Button>
      {isLoading ? (
        renderSkeletons()
      ) : (
        <div className="grid grid-cols-2 gap-x-[7px] gap-y-[18px] overflow-auto md:grid-cols-3 md:max-h-[920px] md:gap-6 md:pr-[31px] ">
          {products.map((value) => (
            <ProductCard dashboard dark product={value.product} key={value.product._id} />
          ))}
        </div>
      )}
    </HStack>
  );
};

export default WishlistProfileTab;
