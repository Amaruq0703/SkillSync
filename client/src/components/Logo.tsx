import { FC } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: FC<LogoProps> = ({ width = 40, height = 40, className = "" }) => {
  return (
    <svg 
      className={className}
      width={width} 
      height={height} 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M135 40C80 40 35 85 35 140C35 195 80 240 135 240C190 240 235 195 235 140C235 85 190 40 135 40ZM135 85C160 85 180 105 180 130C180 155 160 175 135 175C110 175 90 155 90 130C90 105 110 85 135 85ZM135 70C105 70 80 95 80 125C80 155 105 180 135 180C165 180 190 155 190 125C190 95 165 70 135 70Z" 
        fill="#0091FF"
      />
    </svg>
  );
};

export default Logo;
