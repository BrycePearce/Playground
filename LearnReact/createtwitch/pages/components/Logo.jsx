const Logo = ({ width = 40, height = 40 }) => {
  return (
    <svg
      overflow="visible"
      width={`${width}px`}
      height={`${height}px`}
      version="1.1"
      viewBox="0 0 40 40"
      x="0px"
      y="0px"
      style={{ fill: "#9147ff" }}
    >
      <g>
        <polygon points="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8">
          <animate
            dur="150ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="points"
            from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
          ></animate>
          <animate
            dur="250ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="points"
            from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
          ></animate>
          <animate
            dur="50ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="points"
            to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
          ></animate>
          <animate
            dur="75ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="points"
            to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
          ></animate>
        </polygon>
        <polygon
          points="26 25 30 21 30 10 14 10 14 25 18 25 18 29 22 25"
          style={{ fill: "white" }}
        >
          <animateTransform
            dur="150ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="transform"
            type="translate"
            from="0 0"
            to="3 -3"
          ></animateTransform>
          <animateTransform
            dur="250ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="transform"
            type="translate"
            from="3 -3"
            to="0 0"
          ></animateTransform>
          <animateTransform
            dur="50ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="transform"
            type="translate"
            from="3 -3"
            to="0 0"
          ></animateTransform>
          <animateTransform
            dur="75ms"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.25 0.1 0.25 1"
            attributeName="transform"
            type="translate"
            from="0 0"
            to="3 -3"
          ></animateTransform>
        </polygon>
        <g>
          <path d="M20,14 L22,14 L22,20 L20,20 L20,14 Z M27,14 L27,20 L25,20 L25,14 L27,14 Z">
            <animateTransform
              dur="150ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
            <animateTransform
              dur="250ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="50ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="75ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
          </path>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
