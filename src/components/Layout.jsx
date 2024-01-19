import Editor from "./Editor";
import Preview from "./Preview";
import { FaArrowDown } from "react-icons/fa";


function Layout() {
    return (
        <div className="bg-mainBg w-full min-h-screen text-mainColor relative py-3">
            <div className="container flex  flex-col md:flex-row ">
                <Editor />
                <Preview />
            </div>
            <FaArrowDown
                className="arrow md:hidden animate-bounce"
                onClick={() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
                }}
            />
        </div>
    );
}

export default Layout;

