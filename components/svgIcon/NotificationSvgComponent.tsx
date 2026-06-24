const NotificationSvgComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="46"
      viewBox="0 0 48 46"
      fill="none"
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-cover z-10 rounded-xl"
    >
      <g filter="url(#filter0_f_1636_7014)">
        <ellipse
          cx="24"
          cy="37.5996"
          rx="24"
          ry="9"
          fill="#FF9800"
          fillOpacity="1"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1636_7014"
          x="-28.6"
          y="-0.000391006"
          width="105.2"
          height="75.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="14.3"
            result="effect1_foregroundBlur_1636_7014"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default NotificationSvgComponent;
