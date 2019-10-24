# BigQuery

#### **getDataFromBigQuery(sqlQuery,location)**

Recebe uma query SQL e executa no bigquery. Retorna um array com as linhas do resultado, onde cada linha é um array com as chaves sendo as colunas do dataset.

**Argumentos**
- `sqlQuery`: String com a query SQL
- `location`: String com a região de localização do dataset

**Retorno**
- **Object**: Array de objetos com os resultados da consulta.

**Exemplo de código**
*Esse exemplo usa o dataset [github-repos](https://console.cloud.google.com/marketplace/details/github/github-repos?filter=solution-type:dataset&q=github&id=46ee22ab-2ca4-4750-81a7-3ee0f0150dcb) do projeto bigquery-public-data.*



```
async function main() {
    let sqlQuery = `WITH
                        repositories AS (
                    SELECT
                        t2.repo_name,
                        t2.LANGUAGE
                    FROM (
                    SELECT
                        repo_name,
                        LANGUAGE,
                        RANK() OVER (PARTITION BY t1.repo_name ORDER BY t1.language_bytes DESC) AS rank
                    FROM (
                        SELECT
                            repo_name,
                            arr.name AS LANGUAGE,
                            arr.bytes AS language_bytes
                        FROM`
                        +"`bigquery-public-data.github_repos.languages`,"
                        +`UNNEST(LANGUAGE) arr ) AS t1 ) AS t2
                    WHERE
                        rank = 1)
                SELECT
                    COUNT(1) AS RepoCount,
                    LANGUAGE
                FROM
                    repositories
                GROUP BY
                    LANGUAGE
                ORDER BY
                    RepoCount DESC
                LIMIT
                    10`;
    
    let results = await getDataFromBigQuery(sqlQuery);
    console.table(results);
}

```

**Saída do exemplo acima**

| (index) | RepoCount |   LANGUAGE   |
|   ---   |    ---    |      ---     |
|    0    |  616523   | 'JavaScript' |
|    1    |  341972   |   'Python'   |
|    2    |  299051   |    'Java'    |
|    3    |  239829   |    'PHP'     |
|    4    |  195646   |    'Ruby'    |
|    5    |  140283   |    'HTML'    |
|    6    |  139343   |    'C++'     |
|    7    |  134713   |     'C'      |
|    8    |  131675   |    'CSS'     |
|    9    |  101623   |     'C#'     |

**O objeto retornado tem a forma:**

```
    results = [
        {"RepoCount": 616523, "LANGUAGE": 'JavaScript'},
        ...
    ]
```
Então, se quisermos utilizar a linguagem mais utilizada no github, podemos fazer:

```
    let language = results[0]["LANGUAGE"];
```