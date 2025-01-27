import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const Header: React.FC = () => {
  const [searchText, setSearchText] = useState(""); // 入力されたテキストを管理するステート

  const handleSearch = () => {
    console.log("検索テキスト:", searchText); // ここに検索処理を追加
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
        {/* 検索ボタン */}
        <div className="flex flex-wrap flex-auto gap-10 p-3.5 bg-white rounded border border-red-200 border-solid shadow-[0px_2px_4px_rgba(0,0,0,0.15)] max-md:max-w-full">
          <label htmlFor="search" className="sr-only">
            フリーワード検索
          </label>
          <input
            id="search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // 入力値を更新
            placeholder="検索ワードを入力"
            className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-red-200"
          />
          <button
            aria-label="Search"
            className="focus:outline-none"
            onClick={handleSearch} // 検索ボタンをクリックしたときの処理
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ed412da8ceb06e4d6bf92ec743c453aef8b7b85bc83cdee51ab0a14f6887803?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfd"
              alt="Search Icon"
              width={24}
              height={24}
              className="object-contain shrink-0"
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
