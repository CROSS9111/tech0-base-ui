"use client"; // クライアントコンポーネント

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

import { Header } from "../../../component/Header";
import { Footer } from "../../../component/Footer";
import { FilterSection } from "../../../component/FilterSection";
import { Pagination } from "../../../component/Pagination";
import { BusinessCard } from "../../../component/businesscard/BusinessCard";

// 仮でインポート元が同階層にあるように書きますが、
// 実際には yourDataFile.tsx 等から読み込んでください
import { businessCardsData, filterSections } from "./index";
import { useDataContext } from "../context/DataContext";
import CheckDataContext from "../../../component/CheckDataContext";

export  function DocumentLibrary() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const { data, loading, error } = useDataContext();
  const facetInfo = data?.facet_info || {};
  const initial_search_data = data?.search_results || {};

  // 検索結果のページ表示用
  const currentPage = 1; // 現在のページ（必要に応じて動的に変更）
  const itemsPerPage = 20; // 1ページあたりのアイテム数
  const totalCount = data?.total_count || 0;
  // 表示範囲を計算
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);


  // 未ログインの場合はサインインボタンだけ表示
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">You are not signed in.</p>
        <button
          onClick={() => signIn("azure-ad")} // Azure ADを指定
          className="p-2 bg-blue-600 text-white"
        >
          Sign in with Azure AD
        </button>
      </div>
    );
  }

  // ログイン済みの場合
  const accessToken = session.accessToken as string | undefined;

    // // Loading処理
    // if (loading) {
    //   return (
    //     <div className="flex overflow-hidden flex-col bg-gray-200">
    //       <Header />
    //       <div className="flex items-center justify-center min-h-screen">
    //         <p>読み込み中...</p>
    //       </div>
    //     </div>
    //   );
    // }
    if (error) {
      return (
        <div className="flex overflow-hidden flex-col bg-gray-200">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <p>エラーが発生しました: {error}</p>
          </div>
        </div>
      );
    }

  return (
    <div className="flex flex-col overflow-hidden bg-gray-200">

      <Header />

      {/* アクセストークン表示（デモ用） */}
      {/* {accessToken && (
        <div className="bg-white text-red-600 p-4">
          <p>Access Token: {accessToken}</p>
        </div>
      )} */}

      <div className="flex flex-wrap gap-5 justify-between w-full tracking-wider max-w-[1472px] max-md:max-w-full">
        <div className="flex flex-wrap gap-10 max-md:max-w-full">
          <div className="flex flex-auto gap-10 items-start px-10 pt-5 pb-10 text-white whitespace-nowrap rounded-none shadow-[0px_2px_4px_rgba(0,0,0,0.15)] max-md:px-5 bg-gradient-to-r from-red-500 to-red-300">
            <div className="flex gap-1.5 text-base font-bold">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff2502d2f9a34553129fa3e3b6b13d5a12579f63d0e722bead251c0713c3df07?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfd"
                alt="フィルターアイコン"
                width={22}
                height={22}
                className="object-contain shrink-0"
              />
              <div className="my-auto">絞り込み</div>
            </div>
            <button className="flex text-xs" aria-label="Clear filters">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c49cce0b02985bf931b57aed5966ad03c37362cf76515023ecb9c13ed22b5d81?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfd"
                alt="クリアアイコン"
                width={18}
                height={18}
                className="object-contain shrink-0"
              />
              <div>クリア</div>
            </button>
          </div>
          <div className="self-start mt-5 text-sm font-medium leading-none text-neutral-700">
            <span className="font-bold tracking-normal">
              {startItem} - {endItem}
            </span>
            <span className="font-bold"> / {totalCount}個</span>
          </div>
        </div>
        <button className="flex gap-2 px-2.5 py-1.5 my-auto text-xs font-medium leading-none whitespace-nowrap bg-white rounded text-neutral-700">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/66563bd943205171cef57f46fb5c0353a2ed303e51d3517ceddd75738ce9d691?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfd"
            alt="並び替えアイコン"
            width={16}
            height={16}
            className="object-contain shrink-0"
          />
          <div className="my-auto">新しい順</div>
        </button>
      </div>

      <div className="flex gap-5 px-10 mt-5 max-md:flex-col max-md:px-5">
        <div className="flex flex-col max-w-xs">
          {/* {filterSections.map((section, index) => (
            <div key={index} className={index > 0 ? "mt-5" : ""}>
              <FilterSection title={section.title} items={section.items} />
            </div>
          ))} */}
          {Object.entries(facetInfo || {}).map(([facetTitle, facetItems], index) => (
          <div key={index} className={index > 0 ? "mt-5" : ""}>
            <FilterSection
              title={facetTitle}
              items={
                Array.isArray(facetItems)
                  ? facetItems.map((item) => ({
                      label: item.value,
                      count: item.count,
                    }))
                  : []
              }
            />
          </div>
        ))}
        </div>

        <div className="flex flex-col w-full">

        
            <div className="grid grid-cols-2 gap-6">
              {Array.isArray(initial_search_data) &&
                initial_search_data.map((card, index) => (
                  <BusinessCard
                    key={card.id} // 一意のidを利用
                    title={card.title}
                    image="https://geekpictures.co.jp/jp/wp-content/themes/geek/img/logo_head.svg" // 必要に応じてデフォルト画像を指定
                    personInfo={{
                      name: card.authors.join(", "),
                      department: card.category,
                      documentType: "マーケティング資料",
                    }}
                    tags={card.tags}
                    date={new Date(card.release_year, 0, 1).toLocaleDateString()} // リリース年をフォーマット
                    fileType="PDF" // 必要ならデフォルトのファイル種別
                  />
                ))}
            </div>
          
          {/* <div className="grid grid-cols-2 gap-6">
            {businessCardsData.map((card, index) => (
              <BusinessCard
                key={index}
                title={card.title}
                image={card.image}
                personInfo={card.personInfo}
                tags={card.tags}
                date={card.date}
                fileType={card.fileType}
              />
            ))}
          </div> */}

          {/* Pagination（BusinessCardと同じ幅にする） */}
          <div className="mt-8 flex justify-center w-full">
            <Pagination
              currentPage={1}
              totalItems={320}
              itemsPerPage={20}
              onPrevious={() => {}}
              onNext={() => {}}
            />
          </div>
        </div>
      </div>
      {/* サインアウトボタン */}
      <button onClick={() => signOut()} className="p-2 bg-gray-600 text-white">
          Sign Out
      </button>
      <Footer />
    </div>
  );
      
};

export default DocumentLibrary;