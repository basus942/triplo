import { aiModel } from "@/config/ai";
import { formatData } from "@/lib/utils";
import { generateType } from "@/types/generate";
import PromptModel from "../models/prompt";
export const generateTrip = async ({
	prompt,
	promptId,
}: generateType) => {
	const resData = await aiModel.generateContent([prompt]);
	console.log("received Prompt in generateTrip ");
	const data = resData.response.candidates;
	let content;
	if (data) {
		content = formatData(data[0].content.parts[0].text!);
	}
	if (content) {
		const result = await PromptModel.updateOne(
			{
				promptId,
			},
			{
				$push: {
					responses: {
						$each: [content],
						$position: 0,
					},
				},
			}
		);
	}
};
