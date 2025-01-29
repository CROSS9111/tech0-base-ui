import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const Header: React.FC<{ 
  filters?: {[key: string]: (string | number)[] }
  searchKeyword?: string; // 🔹 フリーワード検索を親から受け取る
  onSearch?: (keyword: string) => void;
   }> = ({ filters, searchKeyword, onSearch}) => {
  const [localSearch, setLocalSearch] = useState(searchKeyword || "");
  const [isComposing, setIsComposing] = useState(false); // 日本語入力中のフラグ

  // const handleSearch = () => {
  //   onSearch(searchKeyword);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleSearch(); // エンターキーで検索実行
  //   }
  // };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(localSearch);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      handleSearch();
    }
  };
  
  return (
    <header className="flex flex-wrap gap-5 justify-between px-10 py-4 w-full text-xs tracking-wider text-red-200 whitespace-nowrap bg-white max-md:px-5 max-md:max-w-full">
      <Image
        src="https://geekpictures.co.jp/jp/wp-content/themes/geek/img/logo_head.svg"
        alt="Company Logo"
        width={360}
        height={36}
        priority
        className="object-contain my-auto"
      />

      <div className="flex flex-wrap gap-9">
        <div className="flex flex-wrap flex-auto gap-10 p-3.5 bg-white rounded border border-red-200 border-solid shadow-[0px_2px_4px_rgba(0,0,0,0.15)] max-md:max-w-full">    
        <label htmlFor="search" className="sr-only">
            フリーワード検索
          </label>
          {/* 入力フィールド */}
          <input
            id="search"
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)} // 🔹 リアルタイム更新
            onKeyDown={handleKeyPress} // 🔹 Enterキー押下時に検索実行
            onCompositionStart={() => setIsComposing(true)} // 🔹 IME入力開始
            onCompositionEnd={() => setIsComposing(false)} // 🔹 IME入力確定
            placeholder="フリーワード検索"
            className="flex-grow px-2 py-1 border-none outline-none text-pink-500 placeholder-pink-300 bg-transparent"
          />
          {/* 検索ボタン */}
          <button onClick={handleSearch} aria-label="Search" className="focus:outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ed412da8ceb06e4d6bf92ec743c453aef8b7b85bc83cdee51ab0a14f6887803"
              alt="Search Icon"
              width={24}
              height={24}
              className="object-contain"
            />
          </button>
        </div>

        {/* サインアウトボタン */}
        <button
          onClick={() => signOut()}
          className="p-2 bg-gray-600 text-white rounded"
        >
          Sign Out
        </button>

        {/* メニューアイコン */}
        <button aria-label="Menu">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fe78f2b2c68aafd2c4ef4f55e0cee4461d68d53f3bfc3e51d9464611a00d1b1?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfd"
            alt="Menu Icon"
            width={36}
            height={36}
            className="object-contain shrink-0 my-auto"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
