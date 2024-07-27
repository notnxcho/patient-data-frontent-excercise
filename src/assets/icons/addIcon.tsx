import { IconProps } from '../../types';

const AddIcon = ({ color = 'black', stroke = 1.25, size = 16 }: IconProps) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.3335 6.66667H13.3335M15.3335 6.66667H13.3335M13.3335 6.66667V4.66667M13.3335 6.66667V8.66667'
        stroke={color}
        stroke-width={`${stroke}`}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M0.666504 13.3333V12.6667C0.666504 10.0893 2.75584 8 5.33317 8V8C7.9105 8 9.99984 10.0893 9.99984 12.6667V13.3333'
        stroke={color}
        stroke-width={`${stroke}`}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5.33317 8C6.80593 8 7.99984 6.80609 7.99984 5.33333C7.99984 3.86057 6.80593 2.66667 5.33317 2.66667C3.86041 2.66667 2.6665 3.86057 2.6665 5.33333C2.6665 6.80609 3.86041 8 5.33317 8Z'
        stroke={color}
        stroke-width={`${stroke}`}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default AddIcon;
