import { NextResponse } from "next/server";

// POST メソッドの処理を追加
export async function POST(request: Request) {
  // 環境変数の呼び出し
  const apiUrl = process.env.AZURE_FUNCTION_API_URL || "";
  console.log("apiURL",apiUrl)

  try {
    // リクエストボディをパース
    const requestBody = await request.json();
    console.log("受け取ったデータ:", requestBody);
    // リクエストボディからqueryとfiltersを取得
    const { keyword, filters } = requestBody;

    // デフォルトの検索クエリ
    const search_query = {
      query: keyword || "*", // フリーワード検索が空の場合は "*" を設定
      filters: filters || {}, // フィルターがなければ空のオブジェクト
      facets: ["tags", "authors", "category", "release_year"], // 必要なfacetsを指定
      "top":1000,
      "k_near": 1000
    };
    console.log("search_query",search_query)

    // APIへリクエスト
    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_query),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    // console.log("Serch_queryで取得したデータ:", results);
    // JSONで結果を返す
    return NextResponse.json(results);

    // // レスポンス確認用
    // return NextResponse.json({
    //   message: "リクエストを受信しました",
    //   receivedData: requestBody,
    // });

  } catch (error) {
    console.error("POST リクエストの処理中にエラーが発生しました:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "予期しないエラーが発生しました";

    return NextResponse.json(
      { message: "リクエスト処理中にエラーが発生しました", error: errorMessage },
      { status: 500 }
    );
  }
}