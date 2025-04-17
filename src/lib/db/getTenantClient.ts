import { MongoClient } from "mongodb"

const connections: Record<string, MongoClient> = {}

export const getTenantDb = async (tenantId: string) => {
    if (!connections[tenantId]) {
        const uri = process.env[`MONGO_URI_${tenantId.toUpperCase()}`]
        const client = new MongoClient(uri!)
        await client.connect()
        connections[tenantId] = client
    }

    return connections[tenantId].db(`${tenantId}-db`)
}
