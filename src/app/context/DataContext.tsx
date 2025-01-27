"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// 型定義
interface DataContextType {
  data: any;
  loading: boolean;
  error: string | null;
}

// 初期値
const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
});

// プロバイダーコンポーネント
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 初回データ取得関数
  const fetchInitialData = async () => {
    try {
      const response = await fetch("/api/get_all_information");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("initialfetch",result)
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) { // data が null の場合のみ fetchInitialData を呼び出す
      fetchInitialData();
      console.log("Done fetch")
    }
  }, [data]); // data を依存関係に追加

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Contextを使用するためのフック
export const useDataContext = () => {
  return useContext(DataContext);
};