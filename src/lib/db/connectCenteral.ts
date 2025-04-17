import { MongoClient } from 'mongodb'

let client: MongoClient | null = null

export const getCentralClient = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI_CENTRAL!)
    await client.connect()
  }
  return client.db('central-db')
}
