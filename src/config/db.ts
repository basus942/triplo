/* eslint-enable no-global-assign */
declare global {
	var mongoose: {
		conn: typeof import("mongoose") | null;
		promise: Promise<typeof import("mongoose")> | null;
	};
}

export {};
/* eslint-enable no-global-assign */
import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI!)
			.then((mongoose) => {
				console.log("Db connected");
				return mongoose;
			});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
