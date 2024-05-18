/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import { Disclosure } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import arrowDown from '@/shared/assets/icons/arrow_down.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductsSidebar: FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categoryData, isLoading: categoryIsLoading } = useAxios<Category[]>(
    ApiRoutes.CATEGORY,
  );

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<Category | null>(
    null,
  );
  const [price, setPrice] = useState<{ min: string; max: string }>({
    min: searchParams.get('minPrice') || '0',
    max: searchParams.get('maxPrice') || '99999',
  });
  const [rating, setRating] = useState<string | null>(searchParams.get('rating') || null);

  const handleApplyFilters = () => {
    if (selectedCategory) searchParams.set('category', String(selectedCategory?._id));
    if (selectedSubcategory)
      searchParams.set('category', String(selectedSubcategory?._id));
    if (selectedSubSubcategory)
      searchParams.set('category', String(selectedSubSubcategory?._id));

    if (price.min !== '0' || price.max !== '99999') {
      searchParams.set('minPrice', String(price.min));
      searchParams.set('maxPrice', String(price.max));
    }
    if (rating) searchParams.set('rating', String(rating));

    setSearchParams(searchParams);
  };

  const clearSearchParams = () => {
    const params = new URLSearchParams();

    setSearchParams(params);
  };

  return (
    <aside className="w-full flex flex-col gap-3">
      <div className="w-full px-4 py-2 shadow-custom-base rounded-2xl">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          {/* --------------------Категорія----------------------- */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Категорія"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <ul className="flex flex-col gap-2">
                    {categoryIsLoading && (
                      <span className="text-center">Завантаження...</span>
                    )}
                    {categoryData &&
                      categoryData.slice(0, 11).map((item) => (
                        <li key={item._id}>
                          <button type="button" onClick={() => setSelectedCategory(item)}>
                            <Text
                              Tag="span"
                              text={item.name}
                              size="sm"
                              color="primary"
                              className={`${item._id === selectedCategory?._id && 'font-bold'}`}
                            />
                          </button>
                        </li>
                      ))}
                  </ul>

                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Підкатегорія----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Підкатегорія"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <ul className="flex flex-col gap-2">
                    {!selectedCategory && <span>Виберіть категорію</span>}
                    {selectedCategory?.subcategories.length === 0 && (
                      <span>Немає підкатегорій</span>
                    )}
                    {selectedCategory &&
                      selectedCategory.subcategories.map((item) => (
                        <li key={item._id}>
                          <button
                            type="button"
                            onClick={() => setSelectedSubcategory(item)}
                          >
                            <Text
                              Tag="span"
                              text={item.name}
                              size="sm"
                              color="primary"
                              className={`${item._id === selectedSubcategory?._id && 'font-bold'}`}
                            />
                          </button>
                        </li>
                      ))}
                  </ul>

                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Розділ----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Розділ"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <ul className="flex flex-col gap-2">
                    {!selectedSubcategory && <span>Виберіть підкатегорію</span>}
                    {selectedSubcategory?.subcategories.length === 0 && (
                      <span>Немає розділів</span>
                    )}
                    {selectedSubcategory &&
                      selectedSubcategory.subcategories.map((item) => (
                        <li key={item._id}>
                          <button
                            type="button"
                            onClick={() => setSelectedSubSubcategory(item)}
                          >
                            <Text
                              Tag="span"
                              text={item.name}
                              size="sm"
                              color="primary"
                              className={`${item._id === selectedSubSubcategory?._id && 'font-bold'}`}
                            />
                          </button>
                        </li>
                      ))}
                  </ul>

                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Продавець----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Продавець"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Ціна----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Ціна"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex gap-1 items-center content-center">
                    <Text Tag="span" text="від" size="sm" color="primary" />
                    <input
                      name="minPrice"
                      type="number"
                      value={price.min}
                      min={0}
                      max={999999}
                      maxLength={6}
                      onChange={(e) => setPrice({ ...price, min: e.target.value })}
                      autoComplete="off"
                      className="rounded-lg p-2 w-full border-gray-300 border-[1px] focus:outline-none text-selected-dark"
                    />
                    <Text Tag="span" text="—" size="sm" color="primary" />
                    <Text Tag="span" text="до" size="sm" color="primary" />
                    <input
                      name="maxPrice"
                      type="number"
                      value={price.max}
                      min={0}
                      max={999999}
                      maxLength={6}
                      onChange={(e) => setPrice({ ...price, max: e.target.value })}
                      autoComplete="off"
                      className="rounded-lg p-2 w-full border-gray-300 border-[1px] focus:outline-none text-selected-dark"
                    />
                    <Text Tag="span" text="₴" size="sm" color="primary" />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Рейтинг----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Рейтинг"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center content-center">
                      <input
                        type="radio"
                        id="5"
                        name="rating"
                        value="5"
                        checked={rating === '5'}
                        onChange={() => setRating('5')}
                        className="cursor-pointer"
                      />
                      <Text Tag="span" text="5" size="xs" color="primary" />
                    </div>

                    <div className="flex gap-1 items-center content-center">
                      <input
                        type="radio"
                        id="4"
                        name="rating"
                        value="4"
                        checked={rating === '4'}
                        onChange={() => setRating('4')}
                        className="cursor-pointer"
                      />
                      <Text Tag="span" text="від 4" size="xs" color="primary" />
                    </div>

                    <div className="flex gap-1 items-center content-center">
                      <input
                        type="radio"
                        id="3"
                        name="rating"
                        value="3"
                        checked={rating === '3'}
                        onChange={() => setRating('3')}
                        className="cursor-pointer"
                      />
                      <Text Tag="span" text="від 3" size="xs" color="primary" />
                    </div>

                    <div className="flex gap-1 items-center content-center">
                      <input
                        type="radio"
                        id="2"
                        name="rating"
                        value="2"
                        checked={rating === '2'}
                        onChange={() => setRating('2')}
                        className="cursor-pointer"
                      />
                      <Text Tag="span" text="від 2" size="xs" color="primary" />
                    </div>

                    <div className="flex gap-1 items-center content-center">
                      <input
                        type="radio"
                        id="1"
                        name="rating"
                        value="1"
                        checked={rating === '1'}
                        onChange={() => setRating('1')}
                        className="cursor-pointer"
                      />
                      <Text Tag="span" text="від 1" size="xs" color="primary" />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

      <Button
        id="all-category-button"
        aria-controls="all-category-modal"
        variant="primary"
        aria-haspopup
        className="hidden lg:block all-products-button py-[5px] w-full bg-secondary-yellow"
        onClick={handleApplyFilters}
      >
        <Text Tag="span" text="Застосувати" size="lg" color="primary" />
      </Button>
      <button
        type="button"
        className="w-full flex content-center justify-center"
        onClick={clearSearchParams}
      >
        <Text
          Tag="span"
          text="Відмінити"
          size="sm"
          color="primary"
          className="mt-2 underline underline-offset-8"
          bold
        />
      </button>
    </aside>
  );
};

export default ProductsSidebar;
