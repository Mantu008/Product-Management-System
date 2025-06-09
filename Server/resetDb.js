const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

async function resetDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");

    // Get the users collection
    const usersCollection = mongoose.connection.collection('users');

    // Drop all indexes
    await usersCollection.dropIndexes();
    console.log("Dropped all indexes");

    // Create new index for email
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log("Created new email index");

    console.log("Database reset completed successfully");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

resetDatabase(); 