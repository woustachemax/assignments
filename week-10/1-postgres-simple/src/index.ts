import { Client } from 'pg'
import { DB_URL } from './config';

export const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_Z8lDor4fIwOc@ep-patient-hill-a8es974n-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
});
