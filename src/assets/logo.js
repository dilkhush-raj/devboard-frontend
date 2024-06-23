"use client";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function Logo() {
  const {theme, setTheme} = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fillColor = isMounted
    ? theme === "light"
      ? "black"
      : "white"
    : "white";

  return (
    <svg
      width={122}
      height={30}
      viewBox="0 0 122 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.88 16.92C63.88 16.552 63.744 16.2 63.472 15.864C63.2 15.512 62.72 15.312 62.032 15.264C61.584 15.808 61.04 16.08 60.4 16.08C59.856 16.08 59.392 15.888 59.008 15.504C58.624 15.12 58.432 14.648 58.432 14.088C58.432 13.528 58.624 13.056 59.008 12.672C59.392 12.288 59.856 12.096 60.4 12.096C60.688 12.096 60.968 12.176 61.24 12.336C61.528 12.496 61.784 12.688 62.008 12.912C62.36 12.896 62.632 12.84 62.824 12.744C63.016 12.648 63.152 12.536 63.232 12.408C63.328 12.264 63.384 12.104 63.4 11.928C63.416 11.752 63.424 11.576 63.424 11.4V8.976C63.424 8.576 63.296 8.208 63.04 7.872C62.8 7.536 62.384 7.368 61.792 7.368H56.776L56.752 23.208C56.752 23.528 56.6 23.776 56.296 23.952C56.008 24.112 55.688 24.192 55.336 24.192C54.392 24.192 53.92 23.808 53.92 23.04V6.384C53.92 5.808 54.064 5.424 54.352 5.232C54.656 5.04 55.016 4.944 55.432 4.944H62.392C62.808 4.944 63.248 5.024 63.712 5.184C64.192 5.344 64.64 5.56 65.056 5.832H65.032C65.448 6.136 65.752 6.536 65.944 7.032C66.152 7.528 66.256 8.104 66.256 8.76V11.472C66.256 12.112 66.12 12.64 65.848 13.056C65.576 13.456 65.288 13.776 64.984 14.016C65.192 14.144 65.392 14.28 65.584 14.424C65.776 14.552 65.936 14.696 66.064 14.856C66.272 15.08 66.432 15.344 66.544 15.648C66.672 15.952 66.736 16.312 66.736 16.728V20.16C66.736 21.472 66.224 22.44 65.2 23.064C64.688 23.384 64.2 23.624 63.736 23.784C63.288 23.944 62.84 24.024 62.392 24.024H58.84C58.568 24.024 58.352 23.912 58.192 23.688C58.048 23.464 57.976 23.168 57.976 22.8C57.976 22 58.312 21.6 58.984 21.6H62.272C62.864 21.6 63.28 21.432 63.52 21.096C63.76 20.76 63.88 20.384 63.88 19.968V16.92ZM77.7903 9.552C78.2063 9.552 78.6303 9.64 79.0623 9.816C79.5103 9.992 79.9423 10.216 80.3583 10.488H80.3343C80.7503 10.792 81.0703 11.192 81.2943 11.688C81.5182 12.168 81.6302 12.728 81.6302 13.368V20.184C81.6302 21.496 81.1983 22.464 80.3343 23.088C79.4863 23.696 78.6383 24 77.7903 24H73.9503C73.5343 24 73.1103 23.928 72.6783 23.784C72.2463 23.64 71.8223 23.408 71.4062 23.088C70.5423 22.48 70.1103 21.512 70.1103 20.184V13.368C70.1103 12.728 70.2223 12.168 70.4463 11.688C70.6703 11.192 70.9903 10.792 71.4062 10.488H71.3823C71.7823 10.216 72.2063 9.992 72.6543 9.816C73.1023 9.64 73.5343 9.552 73.9503 9.552H77.7903ZM77.3583 21.744C77.9503 21.744 78.3663 21.576 78.6063 21.24C78.8623 20.904 78.9903 20.544 78.9903 20.16V13.392C78.9903 12.992 78.8623 12.632 78.6063 12.312C78.3663 11.976 77.9503 11.808 77.3583 11.808H74.3823C73.7903 11.808 73.3663 11.976 73.1103 12.312C72.8703 12.632 72.7503 12.992 72.7503 13.392V20.16C72.7503 20.544 72.8703 20.904 73.1103 21.24C73.3663 21.576 73.7903 21.744 74.3823 21.744H77.3583ZM88.2889 24C87.7929 24 87.3209 23.936 86.8729 23.808C86.4249 23.664 85.9929 23.464 85.5769 23.208V23.232C84.7929 22.736 84.4009 21.824 84.4009 20.496V19.32C84.4009 18.664 84.5129 18.096 84.7369 17.616C84.9769 17.12 85.3049 16.728 85.7209 16.44H85.6969C86.0969 16.168 86.5209 15.968 86.9689 15.84C87.4169 15.696 87.8489 15.624 88.2649 15.624H93.5689V13.392C93.5689 12.992 93.4409 12.632 93.1849 12.312C92.9449 11.976 92.5289 11.808 91.9369 11.808H89.1289C88.5209 11.808 88.0969 11.96 87.8569 12.264C87.6329 12.552 87.5209 12.896 87.5209 13.296V13.488C87.5209 14.32 87.0729 14.736 86.1769 14.736C85.2809 14.736 84.8329 14.32 84.8329 13.488V13.272C84.8329 12.616 84.9449 12.064 85.1689 11.616C85.4089 11.168 85.7289 10.792 86.1289 10.488H86.1049C86.5209 10.216 86.9529 9.992 87.4009 9.816C87.8649 9.64 88.3049 9.552 88.7209 9.552H92.3689C92.7689 9.552 93.1929 9.64 93.6409 9.816C94.1049 9.992 94.5369 10.216 94.9369 10.488H94.9129C95.3289 10.792 95.6489 11.192 95.8729 11.688C96.0969 12.168 96.2089 12.728 96.2089 13.368V22.992C96.2089 23.76 95.7689 24.144 94.8889 24.144C94.7129 24.144 94.5449 24.136 94.3849 24.12C94.2409 24.104 94.1049 24.064 93.9769 24C93.8649 23.92 93.7689 23.816 93.6889 23.688C93.6249 23.544 93.5929 23.36 93.5929 23.136L93.5689 17.88H88.7209C88.3689 17.88 88.0969 17.92 87.9049 18C87.7129 18.08 87.5609 18.208 87.4489 18.384C87.3209 18.656 87.2249 18.872 87.1609 19.032C87.1129 19.176 87.0889 19.344 87.0889 19.536V20.472C87.0889 20.888 87.2089 21.208 87.4489 21.432C87.7049 21.64 88.1369 21.744 88.7449 21.744H91.4329C92.0249 21.744 92.3209 22.12 92.3209 22.872C92.3209 23.192 92.2489 23.464 92.1049 23.688C91.9609 23.896 91.7369 24 91.4329 24H88.2889ZM101.905 22.992C101.905 23.76 101.465 24.144 100.585 24.144C99.6734 24.144 99.2174 23.76 99.2174 22.992V13.056C99.2174 11.744 99.6094 10.832 100.393 10.32C101.177 9.808 102.081 9.552 103.105 9.552H105.841C106.433 9.552 106.729 9.928 106.729 10.68C106.761 11.432 106.465 11.808 105.841 11.808H103.297C102.721 11.808 102.345 11.92 102.169 12.144C101.993 12.368 101.905 12.68 101.905 13.08V22.992ZM117.663 11.808H113.031C112.375 11.808 111.943 12 111.735 12.384C111.511 12.72 111.399 13.112 111.399 13.56V20.472C111.399 20.888 111.527 21.208 111.783 21.432C112.039 21.64 112.463 21.744 113.055 21.744H115.527C116.103 21.744 116.391 22.12 116.391 22.872C116.391 23.192 116.319 23.464 116.175 23.688C116.047 23.896 115.831 24 115.527 24H112.623C111.615 24 110.719 23.744 109.935 23.232C109.151 22.752 108.759 21.84 108.759 20.496V13.344C108.759 12.688 108.863 12.12 109.071 11.64C109.279 11.16 109.607 10.768 110.055 10.464C110.903 9.856 111.751 9.552 112.599 9.552H117.663V5.952C117.663 5.184 118.103 4.8 118.983 4.8C119.863 4.8 120.303 5.184 120.303 5.952V22.992C120.303 23.76 119.863 24.144 118.983 24.144C118.647 24.144 118.343 24.088 118.071 23.976C117.799 23.848 117.663 23.576 117.663 23.16V11.808Z"
        fill={fillColor}
      />
      <path
        d="M10.392 21.6C10.984 21.6 11.4 21.432 11.64 21.096C11.88 20.76 12 20.384 12 19.968V8.976C12 8.576 11.88 8.208 11.64 7.872C11.4 7.536 10.984 7.368 10.392 7.368H4.776L4.752 23.016C4.752 23.368 4.616 23.648 4.344 23.856C4.072 24.064 3.736 24.168 3.336 24.168C2.392 24.168 1.92 23.784 1.92 23.016V6.384C1.92 5.808 2.064 5.424 2.352 5.232C2.656 5.04 3.016 4.944 3.432 4.944H10.992C11.408 4.944 11.84 5.032 12.288 5.208C12.736 5.384 13.168 5.608 13.584 5.88H13.56C13.976 6.184 14.296 6.584 14.52 7.08C14.744 7.56 14.856 8.12 14.856 8.76V20.16C14.856 21.456 14.424 22.424 13.56 23.064C13.144 23.368 12.712 23.608 12.264 23.784C11.832 23.944 11.408 24.024 10.992 24.024H6.96C6.688 24.024 6.472 23.912 6.312 23.688C6.168 23.464 6.096 23.168 6.096 22.8C6.096 22 6.44 21.6 7.128 21.6H10.392ZM20.0263 24.024C19.4343 24.024 19.0343 23.872 18.8263 23.568C18.6183 23.264 18.5143 22.928 18.5143 22.56V6.384C18.5143 6.016 18.6183 5.688 18.8263 5.4C19.0343 5.096 19.4343 4.944 20.0263 4.944H28.3783C28.9703 4.944 29.2823 5.344 29.3143 6.144C29.3463 6.96 29.0343 7.368 28.3783 7.368H21.3463V21.6H28.8103C29.4023 21.6 29.7063 21.992 29.7223 22.776C29.7543 23.608 29.4503 24.024 28.8103 24.024H20.0263ZM27.4903 14.088C27.4903 14.648 27.2903 15.12 26.8903 15.504C26.5063 15.888 26.0343 16.08 25.4743 16.08C24.9303 16.08 24.4663 15.888 24.0823 15.504C23.6983 15.12 23.5063 14.648 23.5063 14.088C23.5063 13.528 23.6983 13.056 24.0823 12.672C24.4663 12.288 24.9303 12.096 25.4743 12.096C26.0343 12.096 26.5063 12.288 26.8903 12.672C27.2903 13.056 27.4903 13.528 27.4903 14.088ZM37.9584 24.12C37.6384 24.12 37.2944 24.072 36.9264 23.976C36.5744 23.864 36.3184 23.664 36.1584 23.376C35.7904 22.128 35.4064 20.848 35.0064 19.536C34.6064 18.224 34.2064 16.936 33.8064 15.672C33.3584 14.184 32.8784 12.64 32.3664 11.04C31.8544 9.424 31.3744 7.88 30.9264 6.408C30.8304 6.056 30.8864 5.752 31.0944 5.496C31.3024 5.224 31.5984 5.024 31.9824 4.896C32.2224 4.832 32.4304 4.8 32.6064 4.8C33.1504 4.8 33.5024 5.072 33.6624 5.616L35.4384 11.304C35.5984 11.88 35.7824 12.512 35.9904 13.2C36.2144 13.888 36.4384 14.592 36.6624 15.312C36.8864 16.032 37.1104 16.752 37.3344 17.472C37.5584 18.176 37.7664 18.832 37.9584 19.44C38.2624 18.432 38.5904 17.344 38.9424 16.176C39.3104 14.992 39.6784 13.792 40.0464 12.576C40.4304 11.36 40.8064 10.16 41.1744 8.976C41.5424 7.776 41.8864 6.656 42.2064 5.616C42.3824 5.072 42.7264 4.8 43.2384 4.8C43.4304 4.8 43.6544 4.832 43.9104 4.896C44.7904 5.136 45.1344 5.64 44.9424 6.408C44.0784 9.208 43.2064 12.032 42.3264 14.88C41.4464 17.728 40.5744 20.56 39.7104 23.376C39.5824 23.696 39.3424 23.904 38.9904 24C38.6544 24.08 38.3104 24.12 37.9584 24.12Z"
        fill="url(#paint0_linear_69280_5922)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_69280_5922"
          x1={-6.78035}
          y1={0.00000681173}
          x2={47.9556}
          y2={4.72183}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" />
          <stop offset={1} stopColor="#2196F3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
