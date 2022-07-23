import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//This component basically just scrolls back to the top of the page whenever the link is changed.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}