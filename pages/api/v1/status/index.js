import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version");
  const postgresVersionValue = postgresVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const databasename = process.env.POSTGRES_DB;
  const usedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databasename],
  });
  const usedConnectionsValue = usedConnections.rows[0].count;
  //console.log(usedConnections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        used_connections: usedConnectionsValue,
      },
    },
  });
}

export default status;
