// import mongoose, { Mongoose, Connection } from 'mongoose';

// // Define the shape of the cached connection
// interface MongooseCache {
//     conn: Connection | null;
//     promise: Promise<Connection> | null;
// }

// // Extend the global object to include mongoose cache
// declare global {
//     // eslint-disable-next-line no-var
//     var mongooseCache: { [key: string]: MongooseCache } | undefined;
// }

// // Initialize the cache
// let cached: { [key: string]: MongooseCache } = global.mongooseCache ?? {};

// // Assign to global if not already set
// if (!global.mongooseCache) {
//     global.mongooseCache = cached;
// }

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable');
// }

// /**
//  * Constructs a MongoDB URI for a specific database name
//  * @param dbName The name of the database to connect to
//  * @returns The constructed MongoDB URI
//  */
// function constructMongoURI(dbName: string): string {
//     // Split the URI at the database name part
//     const uriParts = MONGODB_URI.split('/');
//     const baseUri = uriParts.slice(0, 3).join('/') + '/';
//     const queryParams = uriParts[3].split('?')[1] || '';
//     return `${baseUri}${dbName}${queryParams ? '?' + queryParams : ''}`;
// }

// export async function connectDB(dbName: string): Promise<Connection> {
//     const cacheKey = dbName;

//     // Return cached connection if it exists
//     if (cached[cacheKey]?.conn) {
//         return cached[cacheKey].conn;
//     }

//     if (!cached[cacheKey]) {
//         cached[cacheKey] = { conn: null, promise: null };
//     }

//     if (!cached[cacheKey].promise) {
//         const opts = {
//             bufferCommands: false,
//         };

//         // Construct the MongoDB URI for the specified database
//         const mongoUri = constructMongoURI(dbName);

//         // Use createConnection to create a new connection instance
//         cached[cacheKey].promise = mongoose
//             .createConnection(mongoUri, opts)
//             .asPromise()
//             .then((connection) => {
//                 console.log(`MongoDB connected to database: ${dbName}`);
//                 return connection;
//             })
//             .catch((error) => {
//                 console.error(`MongoDB connection error for database ${dbName}:`, error);
//                 throw error;
//             });
//     }

//     try {
//         cached[cacheKey].conn = await cached[cacheKey].promise;
//         return cached[cacheKey].conn;
//     } catch (error) {
//         cached[cacheKey].promise = null; // Reset promise on error to allow retry
//         throw error;
//     }
// }










import mongoose, { Mongoose, Connection } from 'mongoose';

// Define the shape of the cached connection
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend the global object to include mongoose cache
declare global {
  var mongooseCache: { [key: string]: MongooseCache } | undefined;
}

// Initialize the cache
let cached: { [key: string]: MongooseCache } = global.mongooseCache ?? {};

// Assign to global if not already set
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Constructs a MongoDB URI for a specific database name
 * @param dbName The name of the database to connect to
 * @returns The constructed MongoDB URI
 */
function constructMongoURI(dbName: string): string {
  // Split the URI at the database name part
  const uriParts = MONGODB_URI.split('/');
  const baseUri = uriParts.slice(0, 3).join('/') + '/';
  const queryParams = uriParts[3].split('?')[1] || '';
  return `${baseUri}${dbName}${queryParams ? '?' + queryParams : ''}`;
}

export async function connectDB(dbName: string): Promise<Connection> {
  const cacheKey = dbName;

  // Return cached connection if it exists
  if (cached[cacheKey]?.conn) {
    return cached[cacheKey].conn;
  }

  if (!cached[cacheKey]) {
    cached[cacheKey] = { conn: null, promise: null };
  }

  if (!cached[cacheKey].promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };

    // Construct the MongoDB URI for the specified database
    const mongoUri = constructMongoURI(dbName);

    // Use createConnection to create a new connection instance
    cached[cacheKey].promise = mongoose
      .createConnection(mongoUri, opts)
      .asPromise()
      .then((connection) => {
        console.log(`MongoDB connected to database: ${dbName}`);
        return connection;
      })
      .catch((error) => {
        console.error(`MongoDB connection error for database ${dbName}:`, error);
        throw error;
      });
  }

  try {
    cached[cacheKey].conn = await cached[cacheKey].promise;
    return cached[cacheKey].conn;
  } catch (error) {
    cached[cacheKey].promise = null; // Reset promise on error to allow retry
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
