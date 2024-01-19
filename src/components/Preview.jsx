import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useAuth } from "../context/AppContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';


const customStyle = {
    borderRadius: '5px',
    backgroundColor: '#0a10015',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
};

function Preview() {
    const { markdown } = useAuth();
    const textRef = useRef();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDownloadMarkdown = () => {
        if (textRef.current) {
            const link = document.createElement('a');
            const file = new Blob([textRef.current.innerHTML], { type: 'text/plain' });
            link.href = URL.createObjectURL(file);
            link.download = 'Markdown_File.md';
            link.click();
            URL.revokeObjectURL(link.href);
        }
    };
    const handleDownloadPDF = async () => {
        let pdf;
        try {
            if (textRef.current) {
                const element = textRef.current.innerHTML;
                const options = {
                    margin: 1,
                    fontSize: 30,
                    filename: 'PDF_File.pdf',
                    html2canvas: { scale: 2 },
                    image: { type: 'jpeg', quality: 0.98 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                pdf = await html2pdf(element, options);
            }
            if (pdf) {
                await pdf.save('PDF_File.pdf');
            } else {
                console.error('Generated PDF is undefined');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const components = {
        code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    customStyle={customStyle}
                    showLineNumbers
                    style={solarizedlight}
                    language={match[1]}
                    PreTag="div"
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                />
            ) : (
                <code className="inline-code" {...props}>
                    {children}
                </code>
            );
        },
    };

    return (
        <div className="w-full md:w-1/2	 md:pl-2">
            <div className="flex justify-between items-center py-4">
                <h1 className="font-bold text-2xl pl-3 ">Preview</h1>
                <div>
                    <div className="relative inline-block text-center cursor-pointer">
                        <button
                            id="downloadButton"
                            onClick={toggleDropdown}
                            className="text-mainColor bg-[#374151] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mr-3 rounded-lg text-sm py-1.5 px-2 text-center inline-flex items-center"
                            type="button"
                        >
                            Download
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div
                                id="dropdown"
                                className="z-10 mt-px  absolute bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
                            >
                                <ul className="text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <button onClick={handleDownloadMarkdown} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Markdown
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleDownloadPDF} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >
                                            plain Text
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <Link to="/profile" className="text-mainColor bg-[#374151] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  rounded-lg text-sm py-1.5 px-2 text-center inline-flex items-center">Profile</Link>
                </div>
            </div>
            <hr className="bg-[#22303C] border-0 h-0.5	" />
            <div ref={textRef} className="result prose dark:prose-invert prose-slate prose-img:rounded
            prose-headings:m-0 prose-a:text-blue-600 break-words leading-6 mt-6 overflow-y-auto w-full max-height-86 px-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default Preview;










