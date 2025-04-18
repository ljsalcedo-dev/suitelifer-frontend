import React from "react";

const Facebook = ({ color, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 510"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 256.557C512 384.323 418.261 490.243 295.893 509.464V331.053H355.392L366.72 257.24H295.893V209.347C295.893 189.144 305.792 169.475 337.493 169.475H369.685V106.627C369.685 106.627 340.459 101.635 312.533 101.635C254.208 101.635 216.107 136.984 216.107 200.963V257.219H151.275V331.032H216.107V509.443C93.76 490.2 0 384.301 0 256.557C0 115.181 114.624 0.557373 256 0.557373C397.376 0.557373 512 115.16 512 256.557Z"
        fill={color}
        className={color}
      />
    </svg>
    
  );
};

export default Facebook;
