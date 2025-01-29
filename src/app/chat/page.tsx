"use client"; // クライアントコンポーネント

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// もし既存のHeader/Footer等を流用するならimportしてください
import { Header } from "../../../component/Header";
import { Footer } from "../../../component/Footer";

function ChatBot() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // 質問テキストと回答を保持するstate
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [references, setReferences] = useState<string[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState("");

  // 未ログインの場合
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

  // 質問を送信する
  const handleSubmit = async () => {
    setIsRequesting(true);
    setError("");
    setAnswer("");
    setReferences([]);

    try {
      const requestBody = {
        query: question,
        // filters: {
        //   tags: ["SNS", "広告", "UX"]
        // },
        facets: ["tags", "authors", "release_year"],
        top: 10,
        k_near: 15
      };

      // Azure Functionsエンドポイント（例）
      const url = "/api/rag";
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      // resultは { answer: "...", references: [] } の形
      setAnswer(result.answer || "");
      setReferences(result.references || []);
    } catch (err: any) {
      console.error(err);
      setError(`エラーが発生しました: ${err.message}`);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 overflow-hidden">
      <Header />

      <div className="flex flex-col max-w-3xl mx-auto p-4 gap-4">
        {/* 質問フォーム */}
        <div className="flex flex-col bg-white p-4 rounded shadow">
          <label className="text-sm text-gray-700 font-medium mb-2">
            質問を入力してください
          </label>
          <textarea
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例）データドリブン　意思決定　A/Bテスト"
          />
          <button
            onClick={handleSubmit}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
            disabled={isRequesting}
          >
            {isRequesting ? "送信中..." : "送信"}
          </button>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="text-red-600 font-bold">
            {error}
          </div>
        )}

        {/* 回答表示 */}
        {answer && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">回答</h2>
            <p className="whitespace-pre-line">{answer}</p>
          </div>
        )}

        {/* 参考URL表示 */}
        {references && references.length > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">引用</h2>
            <ul className="list-disc list-inside text-blue-600 underline">
              {references.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* サインアウトボタン */}
      <div className="p-4">
        <button onClick={() => signOut()} className="p-2 bg-gray-600 text-white">
          Sign Out
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default ChatBot;
