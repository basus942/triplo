import dbConnect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import PromptModel from "@/models/prompt";

export async function GET(
	req: NextRequest
): Promise<NextResponse> {
	try {
		const searchParams = req.nextUrl.searchParams;

		const promptId = searchParams.get("promptId");
		if (!promptId) {
			const error = new Error("Prompt Id is Required");
			throw error;
		}
		await dbConnect();
		const result = await PromptModel.findOne({
			promptId: promptId,
		});

		const resObject = {
			promptId: result.promptId,
			response: result.responses[0],
		};
		console.dir(resObject, { depth: 1000 });
		return NextResponse.json(
			{
				success: true,
				statusCode: 200,
				data: resObject,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log(error);
		const statusCode = (error as any)?.statusCode || 500;
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
