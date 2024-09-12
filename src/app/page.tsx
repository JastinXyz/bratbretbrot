"use client"

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { AutoTextSize } from 'auto-text-size';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button";

const parseEmoji = (text: string) => {
  const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
  return text.split(emojiRegex).map((word, index) => {
    if (word.match(emojiRegex)) {
      const emojiSrc = `https://emojicdn.elk.sh/${encodeURIComponent(word)}?style=apple`;
      return <img key={index} src={emojiSrc} className="appleemoji" alt={word} />;
    }
    return word;
  });
};

export default function Home() {
  let [val, setVal] = useState('yaudah si, orang km pemenangnya 🫰');
  let [error, setError] = useState<string>();
  let outputRef = useRef(null);
  
  let convertToImage = () => {
    setError('');
    toPng(outputRef.current!, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
        const textWithoutEmoji = val.replace(emojiRegex, '');
        link.download = "bratbretbrot" + textWithoutEmoji.replace(" ", "").replace(/[^\w\s]/gi, "").slice(0, 10) + ".png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        setError('An error occurred while converting the text to an image');
        console.log(err);
      });
  }

  return (
    <main className="flex justify-center h-screen items-center pb-2">
      <div>
        <div>
          <div ref={outputRef} className="bg-white p-4 leading-none text-justify text-last-justify max-w-[350px] h-[350px] inline-block break-words text-black blur-[2px] font-medium font-['Archivo_Narrow',_'Arial_Narrow',_sans-serif]">
            <AutoTextSize mode="box" maxFontSizePx={170} className="blur-[1px]">
                {parseEmoji(val)}
            </AutoTextSize>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-72 sm:w-96 mt-20">
            <Input placeholder="bratbretbrot" defaultValue={val} onChange={(x) => setVal(x.currentTarget.value)} />
            <Button className="w-full mt-2" onClick={convertToImage}>Download Image</Button>
            <span className="text-red-500 mt-2">{error}</span>
          </div>
        </div>
        <div className="flex justify-center text-center text-sm">
          <footer className="mt-20 w-72 sm:w-96 flex flex-col">
            <span>
              &copy; {new Date().getFullYear()} <a href="https://jstnlt.my.id" target="_blank" className="underline cursor-pointer">JstnLT</a>.
              Resources provided by <a href="https://lumidex.id" target="_blank" className="underline cursor-pointer">Lumidex</a>.  
            </span>
            <span>
              This project is <a href="https://github.com/JastinXyz/bratbretbrot" target="_blank" className="underline cursor-pointer">open source</a> at Github.
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}
