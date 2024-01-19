import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// In React router rendered pages scrolls automatically to the bottom so this is to fix this issue

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}