test("GET to /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  //console.log(responseBody);

  const qtdValues = Object.keys(responseBody.dependencies.database).length;
  expect(qtdValues).toBe(3);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.postgres_version).toBe("16.0");

  expect(responseBody.dependencies.database.max_connections).toBeNumber;
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);

  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.max_connections).not.toBe(0);

  const usedConnections = new Number(
    responseBody.dependencies.database.used_connections,
  );
  expect(usedConnections).toBeNumber;
  expect(responseBody.dependencies.database.used_connections).toBe(1);
  expect(
    responseBody.dependencies.database.used_connections,
  ).toBeGreaterThanOrEqual(0);
  expect(
    responseBody.dependencies.database.used_connections,
  ).toBeLessThanOrEqual(100);
});
