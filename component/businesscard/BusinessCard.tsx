import * as React from "react";
import Image from "next/image";
import { InfoRow } from "./InfoRow";
import { Tag } from "./Tag";
import { BusinessCardProps } from "../types";

export const BusinessCard: React.FC<BusinessCardProps> = ({
  title,
  image,
  personInfo,
  tags,
  date,
  fileType,
}) => {
  return (
    <div className="flex flex-col pb-4 bg-white rounded-lg shadow-[0px_2px_4px_rgba(0,0,0,0.15)] max-md:max-w-full">
      <div className="flex flex-col px-5 mt-4 w-full max-md:max-w-full">
        <Image
          src={image}
          alt="Business update presentation cover"
          width={800}
          height={465}
          loading="lazy"
          className="object-contain w-full max-md:max-w-full"
        />
        <div className="self-start mt-5 text-base font-bold text-neutral-700">
          {title}
        </div>
        <div className="flex flex-col mt-5 w-full text-sm leading-none text-neutral-700 max-md:max-w-full">
          <InfoRow label="担当者" value={personInfo.name} />
          <div className="mt-1">
            <InfoRow label="所属部署" value={personInfo.department} />
          </div>
          {/* <div className="mt-1">
            <InfoRow label="資料種別" value={personInfo.documentType} />
          </div> */}
        </div>
        <div className="flex gap-2.5 items-center self-start mt-6 text-sm font-medium leading-none text-center whitespace-nowrap text-neutral-700">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
        <div className="flex gap-5 justify-between items-start mt-3.5 w-full max-md:mr-2 max-md:max-w-full">
          <div className="flex gap-1 items-center mt-2 text-xs leading-6 text-neutral-500">
            <div className="self-stretch my-auto">{date}</div>
            <div className="self-stretch my-auto">掲載 / </div>
            <div className="self-stretch my-auto">{fileType}</div>
          </div>
          <button className="flex flex-col justify-center items-center px-4 py-1 text-sm font-bold tracking-normal leading-none text-center text-white whitespace-nowrap bg-red-700 rounded-2xl min-h-[28px]">
            <div className="flex gap-1.5 items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cda29923e2f598d7e414a8ae04dd678b7d11e0a938353862902bca33943c5b8f?placeholderIfAbsent=true&apiKey=830249011bfc4b9a9e2dddb095d90bfdoadIcon"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              />
              <div className="self-stretch my-auto">ダウンロード</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
