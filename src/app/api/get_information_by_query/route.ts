import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.AZURE_FUNCTION_API_URL || "";
  console.log("apiURL",apiUrl)
  const get_all_information = {
    query: "*",
    facets: ["tags", "authors", "category","release_year"],
  };

  try {
    // APIへリクエスト
    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(get_all_information),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // console.log("ダミーデータ:", response.json())
    const results = await response.json();
    // const results = test_data

    // ログ出力（デバッグ用）
    console.log("取得したデータ:", results);

    // JSONで結果を返す
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error:", error);

    // 型ガードを使用して error の型を特定
    const errorMessage =
      error instanceof Error
        ? error.message
        : "予期しないエラーが発生しました";

    // エラー時のレスポンスを返却
    return NextResponse.json(
      { message: "データの取得中にエラーが発生しました", error: errorMessage },
      { status: 500 }
    );
  }
}