import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

type VariantTypes = 'search' | 'fill' | 'outlined' | 'notFound' | 'clear' | 'login';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  search:
    'outfit bg-primary px-[14px] py-[9px] rounded-r-lg font-normal text-[14px] text-gray-900 duration-300 hover:bg-secondary  active:bg-primary disabled:opacity-40',
  fill: 'outfit bg-primary px-4 py-[7px] rounded-lg font-normal text-[14px] text-gray-900 duration-300 hover:bg-secondary active:bg-primary disabled:opacity-40',
  notFound:
    'outfit bg-gradient-to-r from-secondary-200 to-salmon-100 px-[106px] py-[13px] rounded-lg font-semibold text-[16px] leading-[22px] text-white duration-300 hover:from-secondary hover:to-salmon-200 disabled:opacity-50',
  login:
    'outfit bg-primary px-[151px] py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400',
  outlined:
    'outfit border-primary border-[1px] px-4 py-[7px] rounded-lg font-normal text-[16px] text-primary duration-300 hover:border-white hover:text-white active:border-secondary active:text-secondary disabled:opacity-40',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant: VariantTypes;
  className?: string;
}

const Button = memo((props: Props) => {
  const { children, onClick, variant, className, ...otherProps } = props;

  return (
    <button
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
