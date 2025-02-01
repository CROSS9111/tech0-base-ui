import * as React from "react";
import Image from "next/image";
import { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  startItem,
  endItem, 
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between self-end px-8 py-5 w-full text-lg font-bold tracking-normal leading-none text-center bg-white rounded-xl max-w-[1076px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      {/* 前へボタン (無効状態の処理追加) */}
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className={`flex gap-3 whitespace-nowrap ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Previous page"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3872fc3e4d75bb1de909bb7f5ff50d118b3cd46097bbc8d12cfb752a3076d837"
          alt="前へアイコン"
          width={16}
          height={16}
          className="object-contain shrink-0 self-start mt-1.5"
        />
        <div>前へ</div>
      </button>

      {/* 現在のページ情報 */}
      <div className="text-base font-medium tracking-wider leading-relaxed">
        <span className="font-bold tracking-normal">
          {totalItems > 0 ? `${startItem} - ${endItem}` : "0"}
        </span>
        <span className="font-bold"> / {totalItems}個</span>
      </div>

      {/* 次へボタン (無効状態の処理追加) */}
      <button
        onClick={onNext}
        disabled={currentPage * itemsPerPage >= totalItems}
        className={`flex gap-3 whitespace-nowrap ${currentPage * itemsPerPage >= totalItems ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Next page"
      >
        <div>次へ</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d9b980931dfacbc47907f2d673a184cd968cd4c26f5d082f8f472b4c8722fa3"
          alt="次へアイコン"
          width={16}
          height={16}
          className="object-contain shrink-0 self-start mt-1.5"
        />
      </button>
    </div>
  );
};
