

async function getDataFromBigQuery(sqlQuery, location='US'){
    const {BigQuery} = require('@google-cloud/bigquery');
    const bigQuery = new BigQuery();
    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: location,
        };
    // Run the query
    const [rows] = await bigQuery.query(options);
    return rows;
}

//Recebe uma query sql e retorna as linhas do resultado, cada linha no formato json com os campos da tabela
