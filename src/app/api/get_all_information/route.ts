import { NextResponse } from "next/server";

  // facet情報をベースに、全てのドキュメントを取得する。
  // ドキュメント数が多い場合、レスポンスが悪くなるため、方法を検討する必要がある。

  //ダミーデータ準備
  const test_data = {
    "search_results": [
        {
            "id": "27",
            "title": "マーケティング記事027",
            "content": "データドリブンなマーケティングは、事実に基づく意思決定を加速させます。顧客セグメントの細分化やA/Bテストの活用で、精度の高いターゲティングを実現し、リソースを最適に配分する方法を事例とともに解説します。",
            "release_year": 2022,
            "created_at": "2022-07-12T00:00:00Z",
            "updated_date": "2022-07-22T00:00:00Z",
            "category": "SNS",
            "tags": [
                "モバイル",
                "UX",
                "コンバージョン"
            ],
            "authors": [
                "鈴木花子",
                "田中健一"
            ],
            "score": 0.03333333507180214
        },
        {
            "id": "7",
            "title": "マーケティング記事007",
            "content": "データドリブンなマーケティングは、事実に基づく意思決定を加速させます。顧客セグメントの細分化やA/Bテストの活用で、精度の高いターゲティングを実現し、リソースを最適に配分する方法を事例とともに解説します。",
            "release_year": 2020,
            "created_at": "2020-07-12T00:00:00Z",
            "updated_date": "2020-07-22T00:00:00Z",
            "category": "SNS",
            "tags": [
                "モバイル",
                "UX",
                "コンバージョン"
            ],
            "authors": [
                "鈴木花子",
                "伊藤大輔"
            ],
            "score": 0.032786883413791656
        },
        {
            "id": "12",
            "title": "マーケティング記事012",
            "content": "モバイルファースト時代のマーケティングでは、ユーザー体験を重視したデザインが必須。ページの読み込み速度や操作性を向上させることで、コンバージョン率を大幅に伸ばすことが可能です。顧客ごとの行動データを分析し、最適化されたアプローチを展開します。",
            "release_year": 2021,
            "created_at": "2021-02-07T00:00:00Z",
            "updated_date": "2021-02-17T00:00:00Z",
            "category": "SNS",
            "tags": [
                "モバイル",
                "UX",
                "コンバージョン"
            ],
            "authors": [
                "鈴木花子",
                "伊藤大輔"
            ],
            "score": 0.016129031777381897
        },
        {
            "id": "32",
            "title": "マーケティング記事032",
            "content": "モバイルファースト時代のマーケティングでは、ユーザー体験を重視したデザインが必須。ページの読み込み速度や操作性を向上させることで、コンバージョン率を大幅に伸ばすことが可能です。顧客ごとの行動データを分析し、最適化されたアプローチを展開します。",
            "release_year": 2023,
            "created_at": "2023-02-07T00:00:00Z",
            "updated_date": "2023-02-17T00:00:00Z",
            "category": "SNS",
            "tags": [
                "モバイル",
                "UX",
                "コンバージョン"
            ],
            "authors": [
                "佐藤太郎",
                "鈴木花子"
            ],
            "score": 0.01587301678955555
        },
        {
            "id": "41",
            "title": "マーケティング記事041",
            "content": "デジタル施策が主流となる中、SEOやSNS運用は企業の成長に欠かせない要素です。ターゲット層を正確に把握し、最適なチャネルで効果的に情報を発信する手法を解説します。また、コンテンツの質や頻度を管理し、顧客との長期的な関係構築を目指すことが重要となります。",
            "release_year": 2024,
            "created_at": "2024-01-06T00:00:00Z",
            "updated_date": "2024-01-16T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "鈴木花子",
                "伊藤大輔"
            ],
            "score": 0.014492753893136978
        },
        {
            "id": "21",
            "title": "マーケティング記事021",
            "content": "デジタル施策が主流となる中、SEOやSNS運用は企業の成長に欠かせない要素です。ターゲット層を正確に把握し、最適なチャネルで効果的に情報を発信する手法を解説します。また、コンテンツの質や頻度を管理し、顧客との長期的な関係構築を目指すことが重要となります。",
            "release_year": 2022,
            "created_at": "2022-01-06T00:00:00Z",
            "updated_date": "2022-01-16T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "伊藤大輔",
                "鈴木花子"
            ],
            "score": 0.014705882407724857
        },
        {
            "id": "1",
            "title": "マーケティング記事001",
            "content": "デジタル施策が主流となる中、SEOやSNS運用は企業の成長に欠かせない要素です。ターゲット層を正確に把握し、最適なチャネルで効果的に情報を発信する手法を解説します。また、コンテンツの質や頻度を管理し、顧客との長期的な関係構築を目指すことが重要となります。",
            "release_year": 2020,
            "created_at": "2020-01-06T00:00:00Z",
            "updated_date": "2020-01-16T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "佐藤太郎",
                "鈴木花子"
            ],
            "score": 0.014285714365541935
        },
        {
            "id": "6",
            "title": "マーケティング記事006",
            "content": "パーソナライゼーションを徹底すると、ユーザーのニーズを先回りして提案することが可能になります。メール配信やウェブサイトのレコメンド機能など、多角的な手段を活用して顧客満足度を高めるアプローチを探ります。",
            "release_year": 2020,
            "created_at": "2020-06-11T00:00:00Z",
            "updated_date": "2020-06-21T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "佐藤太郎",
                "鈴木花子"
            ],
            "score": 0.01515151560306549
        },
        {
            "id": "36",
            "title": "マーケティング記事036",
            "content": "パーソナライゼーションを徹底すると、ユーザーのニーズを先回りして提案することが可能になります。メール配信やウェブサイトのレコメンド機能など、多角的な手段を活用して顧客満足度を高めるアプローチを探ります。",
            "release_year": 2023,
            "created_at": "2023-06-11T00:00:00Z",
            "updated_date": "2023-06-21T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "鈴木花子",
                "田中健一"
            ],
            "score": 0.015625
        },
        {
            "id": "46",
            "title": "マーケティング記事046",
            "content": "パーソナライゼーションを徹底すると、ユーザーのニーズを先回りして提案することが可能になります。メール配信やウェブサイトのレコメンド機能など、多角的な手段を活用して顧客満足度を高めるアプローチを探ります。",
            "release_year": 2024,
            "created_at": "2024-06-11T00:00:00Z",
            "updated_date": "2024-06-21T00:00:00Z",
            "category": "デジタル",
            "tags": [
                "SEO",
                "SNS",
                "広告"
            ],
            "authors": [
                "伊藤大輔",
                "鈴木花子"
            ],
            "score": 0.015384615398943424
        }
    ],
    "facet_info": {
        "tags": [
            {
                "value": "SEO",
                "count": 7
            },
            {
                "value": "SNS",
                "count": 7
            },
            {
                "value": "広告",
                "count": 7
            },
            {
                "value": "UX",
                "count": 4
            },
            {
                "value": "コンバージョン",
                "count": 4
            },
            {
                "value": "モバイル",
                "count": 4
            }
        ],
        "authors": [
            {
                "value": "鈴木花子",
                "count": 11
            },
            {
                "value": "伊藤大輔",
                "count": 5
            },
            {
                "value": "佐藤太郎",
                "count": 3
            },
            {
                "value": "田中健一",
                "count": 2
            },
            {
                "value": "高橋裕子",
                "count": 1
            }
        ],
        "release_year": [
            {
                "value": 2020,
                "count": 3
            },
            {
                "value": 2021,
                "count": 2
            },
            {
                "value": 2022,
                "count": 2
            },
            {
                "value": 2023,
                "count": 2
            },
            {
                "value": 2024,
                "count": 2
            }
        ]
    },
    "total_count": 11
}

export async function GET() {
  const apiUrl = process.env.AZURE_FUNCTION_API_URL || "";
  console.log("apiURL",apiUrl)
  const get_all_information = {
    query: "*",
    facets: ["tags", "authors", "category","release_year"],
    Top:1000,
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
    console.log("取得したデータ完了");


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