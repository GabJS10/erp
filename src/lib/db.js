import postgres from 'serverless-postgres';

const db = postgres({
  config: {
    host: "localhost",
    port: "5432",
    database: "erp-sistema",
    user: "postgres",
    password: "admin1234"
  }
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}