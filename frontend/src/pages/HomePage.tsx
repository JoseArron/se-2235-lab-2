import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiTrash,
  PiUpload,
} from "react-icons/pi";
import { useState } from "react";
import Header from "../components/header";

const HomePage = () => {
  const [noteText, setNoteText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      console.log(file.name);
      setSelectedFile(null);
    }
  };

  const handleNoteUpload = () => {
    if (!noteText.trim()) {
      alert("Please enter some text before uploading.");
      return;
    }
    console.log(noteText);
    setNoteText("");
  };

  const clearText = () => {
    setNoteText("");
  };

  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={true} />
      <div className="header-bottom w-full px-20 pt-20 pb-10 bg-white flex justify-between items-center">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl font-secondaryRegular">
          Upload Notes
        </div>
      </div>
      <div className="uploadNotes relative w-full h-auto min-h-screen px-20 bg-white">
        <div className="w-full bg-white rounded-lg border-4 border-[#03c04a] flex flex-col">
          <textarea
            className="w-auto h-80 p-3 rounded-lg border-2 border-[#03c04a] text-black justify-left text-3xl font-primaryRegular overflow-hidden overflow-y-scroll resize-none scrollbar-hidden"
            placeholder="Input text here"
            value={noteText}
            onChange={handleTextChange}
          />
          <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
            <div className="flex gap-2">
              <button className="p-2 text-black hover:bg-gray-200 rounded">
                <PiListBold size={40} />
              </button>
              <button className="p-2 text-black hover:bg-gray-200 rounded">
                <PiListNumbersBold size={40} />
              </button>
            </div>
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={clearText}
            >
              <PiTrash size={40} />
            </button>
          </div>
        </div>
        <div className="p-5 flex justify-between items-center gap-4">
          <label className="px-6 py-3 flex items-center bg-[#03c04a] text-white rounded-lg text-2xl font-secondaryRegular cursor-pointer">
            <PiPaperclip size={30} />
            <span className="ml-2">Attach Files</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <button
            className="px-6 py-3 flex gap-2 border-2 border-[#03c04a] text-black rounded-lg text-2xl font-secondaryRegular"
            onClick={handleNoteUpload}
          >
            <PiUpload size={30} />
            Upload
          </button>
        </div>
      </div>
      <div className="text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
        <div>Flashcards</div>
      </div>
    </div>
  );
};

export default HomePage;
