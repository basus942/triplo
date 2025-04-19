import { model, models, Schema } from "mongoose";

const PromptSchema = new Schema(
	{
		promptId: {
			type: String,
			unique: true,
			required: true,
		},
		user_id: {
			type: String,
		},
		promptText: { type: String, required: true },
		responses: [{ type: Schema.Types.Mixed }],
	},
	{ timestamps: true }
);
const Prompt =
	models?.Prompt || model("Prompt", PromptSchema);
export default Prompt;
