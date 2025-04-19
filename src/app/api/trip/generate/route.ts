import { buildPrompt } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest
): Promise<NextResponse> {
	try {
		const reqBody = await req.json();
		const { promptId } = await buildPrompt(reqBody);
		return NextResponse.json(
			{
				success: true,
				statusCode: 200,
				data: { promptId },
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		const statusCode = 500;
		return NextResponse.json(
			{
				success: false,
				statusCode: statusCode,
				message:
					JSON.stringify(error) || "Something went wrong",
			},
			{
				status: statusCode,
			}
		);
	}
}
