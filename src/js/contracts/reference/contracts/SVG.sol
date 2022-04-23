pragma solidity ^0.8.0;

library SVG {

  function generateSvg(
    string memory description,
    string memory flowRate,
    string memory timeFrame,
    string memory senderBalance,
    string memory daysLeft
  ) public pure returns (string memory) {
    string memory svg = string(abi.encodePacked(
      '<svg width="540" height="540" viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
        '<g>',
          '<title>', description,'</title>',
        '</g>',
        '<rect width="540" height="540" rx="40" fill="black"/>',
        '<rect width="540" height="540" rx="40" fill="url(#paint0_linear_45_52)" fill-opacity="0.7"/>',
        '<rect x="45" y="64" width="165" height="123" fill="url(#pattern0)"/>',
        '<circle cx="127.5" cy="127.5" r="61.5" stroke="white" stroke-width="4"/>',
        '<text font-family="SF Pro Display" text-anchor="end" x="478" y="130" fill="white" font-size="88">$ ', senderBalance,'</text>',
        '<path d="M378.113 185.516C384.967 185.516 390.102 181.369 391.068 175.203L391.09 174.988H386.32L386.256 175.182C385.096 179.113 382.238 181.262 378.113 181.262C372.377 181.262 368.66 176.664 368.66 169.488V169.467C368.66 162.291 372.355 157.736 378.113 157.736C382.281 157.736 385.16 159.949 386.191 163.58L386.32 164.01H391.09L391.047 163.816C390.08 157.693 384.945 153.482 378.113 153.482C369.326 153.482 363.74 159.627 363.74 169.467V169.488C363.74 179.328 369.326 185.516 378.113 185.516ZM394.453 185H399.093V171.529C399.093 168.156 400.941 166.201 403.927 166.201C404.83 166.201 405.646 166.309 406.011 166.459V162.141C405.646 162.076 405.066 161.969 404.4 161.969C401.822 161.969 399.931 163.623 399.201 166.266H399.093V162.398H394.453V185ZM417.108 185.451C422.587 185.451 426.067 182.186 426.798 178.598L426.841 178.361H422.436L422.372 178.533C421.792 180.23 419.966 181.648 417.216 181.648C413.52 181.648 411.179 179.156 411.093 174.881H427.099V173.312C427.099 166.523 423.21 161.969 416.872 161.969C410.534 161.969 406.452 166.695 406.452 173.764V173.785C406.452 180.918 410.47 185.451 417.108 185.451ZM416.893 165.771C419.923 165.771 422.114 167.684 422.501 171.594H411.157C411.565 167.812 413.886 165.771 416.893 165.771ZM438.711 185.451C441.955 185.451 444.448 183.818 445.801 181.176H445.887V185H450.549V153.998H445.887V166.244H445.801C444.448 163.58 441.869 161.969 438.668 161.969C432.996 161.969 429.258 166.48 429.258 173.678V173.699C429.258 180.896 432.953 185.451 438.711 185.451ZM439.936 181.455C436.262 181.455 434.006 178.512 434.006 173.699V173.678C434.006 168.908 436.284 165.943 439.936 165.943C443.416 165.943 445.909 168.994 445.909 173.678V173.699C445.909 178.404 443.438 181.455 439.936 181.455ZM457.392 158.918C458.918 158.918 460.099 157.715 460.099 156.254C460.099 154.771 458.918 153.568 457.392 153.568C455.888 153.568 454.685 154.771 454.685 156.254C454.685 157.715 455.888 158.918 457.392 158.918ZM455.072 185H459.713V162.398H455.072V185ZM471.991 185.451C472.937 185.451 473.818 185.344 474.355 185.258V181.67C474.011 181.713 473.603 181.756 473.109 181.756C471.154 181.756 470.122 181.068 470.122 178.77V166.094H474.355V162.398H470.122V156.512H465.374V162.398H462.13V166.094H465.374V179.049C465.374 183.561 467.523 185.451 471.991 185.451Z" fill="#8A8A8A"/>',
        '<text font-family="SF Pro Display" x="64" y="360" fill="white" font-size="54">$', flowRate,' / ', timeFrame,'</text>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H459C467.837 444 475 451.163 475 460C475 468.837 467.837 476 459 476H80C71.1635 476 64 468.837 64 460Z" fill="url(#paint0_linear_2_2)"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H459C467.837 444 475 451.163 475 460C475 468.837 467.837 476 459 476H80C71.1635 476 64 468.837 64 460Z" fill="#7000FF" fill-opacity="0.4"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H459C467.837 444 475 451.163 475 460C475 468.837 467.837 476 459 476H80C71.1635 476 64 468.837 64 460Z" fill="#3D3D3D"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H187C195.837 444 203 451.163 203 460C203 468.837 195.837 476 187 476H80C71.1634 476 64 468.837 64 460Z" fill="url(#paint1_linear_2_2)"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H187C195.837 444 203 451.163 203 460C203 468.837 195.837 476 187 476H80C71.1634 476 64 468.837 64 460Z" fill="#FF00C7" fill-opacity="0.4"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H192C200.837 444 208 451.163 208 460C208 468.837 200.837 476 192 476H80C71.1634 476 64 468.837 64 460Z" fill="url(#paint2_linear_2_2)"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H192C200.837 444 208 451.163 208 460C208 468.837 200.837 476 192 476H80C71.1634 476 64 468.837 64 460Z" fill="#FF00C7" fill-opacity="0.4"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H192C200.837 444 208 451.163 208 460C208 468.837 200.837 476 192 476H80C71.1634 476 64 468.837 64 460Z" fill="url(#paint3_linear_2_2)"/>',
        '<path d="M64 460C64 451.163 71.1634 444 80 444H192C200.837 444 208 451.163 208 460C208 468.837 200.837 476 192 476H80C71.1634 476 64 468.837 64 460Z" fill="#FF00C7" fill-opacity="0.4"/>',
        '<text font-family="SF Pro Display" x="64" y="418" fill="white" font-size="32">', daysLeft,' days left</text>',
        '<path d="M133.456 88V122.46L132.052 118.501L130.18 156.919L132.988 164.603L135.328 164.836C139.865 165.051 144.393 165.439 148.9 166V88H133.456Z" fill="#B20710"/>',
        '<path d="M106 88V166L108.773 165.767L113.627 165.301L121.022 164.836L121.253 148.304V131.773L122.409 135.033L122.871 136.43L124.72 98.0119L124.027 96.1493L121.253 88.2328V88H106Z" fill="#B20710"/>',
        '<path d="M106 88C106 88 121.388 143.415 121.388 142.484V131.773L122.554 135.033L133.046 164.603L135.377 164.836C139.898 165.05 144.409 165.438 148.9 166L133.512 111.051V122.46L132.113 118.501L124.186 96.1493L121.388 88.2328L121.155 88H106Z" fill="url(#paint4_linear_2_2)"/>',
        '<path d="M106 88L121.388 131.773L122.554 135.033L133.046 164.603L135.377 164.836C139.898 165.051 144.409 165.439 148.9 166L133.512 122.46L132.113 118.501L124.186 96.1493L121.388 88.2328V88H106Z" fill="#E50914"/>',
        '<defs>',
        '<style type="text/css">@import url("https://fonts.cdnfonts.com/css/sf-pro-display");</style>',
        '<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">',
        '<use xlink:href="#image0_2_2" transform="translate(0 -0.00304878) scale(0.0025 0.00335366)"/>',
        '</pattern>',
        '<linearGradient id="paint0_linear_45_52" x1="438" y1="-3.01689e-05" x2="-49.4691" y2="534.02" gradientUnits="userSpaceOnUse">',
        '<stop stop-color="#3A7AF8"/>',
        '<stop offset="1" stop-opacity="0"/>',
        '</linearGradient>',
        '<linearGradient id="paint0_linear_2_2" x1="302.5" y1="460" x2="133" y2="460" gradientUnits="userSpaceOnUse">',
        '<stop stop-color="#00FF47"/>',
        '<stop offset="1" stop-color="#00FF57" stop-opacity="0"/>',
        '</linearGradient>',
        '<linearGradient id="paint1_linear_2_2" x1="272.5" y1="460" x2="87.3358" y2="460" gradientUnits="userSpaceOnUse">',
        '<stop stop-color="white"/>',
        '<stop offset="1" stop-color="#00FF57" stop-opacity="0"/>',
        '</linearGradient>',
        '<linearGradient id="paint2_linear_2_2" x1="280" y1="460" x2="88.1752" y2="460" gradientUnits="userSpaceOnUse">',
        '<stop stop-color="white"/>',
        '<stop offset="1" stop-color="#00FF57" stop-opacity="0"/>',
        '</linearGradient>',
        '<linearGradient id="paint3_linear_2_2" x1="169.778" y1="460" x2="88.1752" y2="460" gradientUnits="userSpaceOnUse">',
        '<stop stop-color="#7000FF"/>',
        '<stop offset="1" stop-color="#00FF57" stop-opacity="0"/>',
        '</linearGradient>',
        '</defs>',
      '</svg>'
    ));

    return svg;
  }
}