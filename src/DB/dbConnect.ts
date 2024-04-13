import mongoose from "mongoose";

type connectionType = {
    isConnected?: number;
};

const connection: connectionType = {};

const DBconnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Database already connected");
        return;
    }

    try {
        const connect = await mongoose.connect(process.env.DATBASE_URL || "");

		const connections = connection.isConnected=connect.connections[0].readyState;
		console.log(connections);
		console.log(connect);
		
		
    } catch (error) {
        console.log("Data base connection fail! connection error: ", error);

		process.exit(1)
    }
};
