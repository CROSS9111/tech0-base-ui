import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // リクエストボディのJSONを取得
        const requestBody = await req.json();

        const azureFunctionsUrl = process.env.AZURE_RAG_API_URL || "Unknown";

        const azureRes = await fetch(azureFunctionsUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
        });

        if (!azureRes.ok) {
        const errorText = await azureRes.text();
        return new Response(
            JSON.stringify({ error: errorText }),
            { status: azureRes.status }
        );
        }

        const result = await azureRes.json();

        // Next.js標準の NextResponse.json で返却
        return NextResponse.json(result, { status: 200 });
    } catch (err: any) {
        console.error("API Route Error:", err);
        return NextResponse.json({ error: err.message || "Unknown Error" }, { status: 500 });
    }
    }
