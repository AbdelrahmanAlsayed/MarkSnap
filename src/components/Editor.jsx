import { useState } from "react";
import { useAuth } from "../context/AppContext";

function Editor() {
    const { markdown, setMarkdown } = useAuth();
    const [characters, setCharacters] = useState(1021);
    const [words, setWords] = useState(167);

    const getCharactersCount = (string) => {
        return string.length;
    };

    const getWordsCount = (paragraph) => {
        return paragraph.trim().split(/\s+/).filter(word => word !== '').length;
    }

    const updateMarkdown = (event) => {
        const value = event.target.value;
        setMarkdown(value);
        setWords(getWordsCount(value));
        setCharacters(getCharactersCount(value));
    };

    return (
        <div className="w-full md:w-1/2	 md:pr-2">
            <div className="flex justify-between items-center py-4">
                <h1 className="font-bold text-2xl "> Editor</h1>
                <div className="text-sm font-bold">
                    <span className="pr-4">{words} words</span>
                    <span> {characters} characters</span>
                </div>
            </div>
            <hr className="bg-[#22303C] border-0 h-0.5" />
            <textarea
                className="leading-6 mt-6 bg-mainBg text-[#f9f9f9] w-full min-height-86 outline-none border-none resize-none md:pr-3 text-sm"
                value={markdown}
                onChange={updateMarkdown}
                autoFocus
                aria-label="Markdown Input"
            ></textarea>
        </div>
    )
}

export default Editor;

