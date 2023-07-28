import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.png";
import MobileLogo from "@/assets/images/logo/logo-c.png";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" width={50} />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" width={50}/>
        )}
      </Link>
    </div>
  );
};

export default Logo;
