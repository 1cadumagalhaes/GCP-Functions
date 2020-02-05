# Cloud Storage

#### **getFileStringFromStorage(inputBucketName,fileName)**

Recebe o nome do Bucket dentro do GCS (Google Cloud Storage) e o nome do arquivo dentro do bucket, e retorna a string do conteúdo do arquivo.

Pode ser utilizado para pegar o conteúdo de arquivos de texto, json, csv, yaml entre outros.


**Argumentos**
- `inputBucketName`: String com o nome do bucket. Por exemplo, *gcp-functions-test-123*
- `fileName`: String com o nome do arquivo, inclusive com a extensão. Caso o arquivo esteja dentro de uma pasta, colocar o nome da pasta concatenado. Exemplo: *arquivo/teste.txt*

**Retorno**
- **String**: String do conteúdo do arquivo. 

**Exemplo de código**

Para o arquivo test.json da forma
```
{
    "question": "Answer to the Ultimate Question of Life, the Universe, and Everything",
    "answer: 42,
}
```
Teremos o seguinte
```
async function main(){
    let bucket = 'gcp-functions-test-123', file='arquivos/test.json';
    let str = await getFileStringFromStorage(bucket,file);
    let object = JSON.parse(str);
    console.log(object.question) // Answer to the Ultimate Question of Life, the Universe, and Everything
    console.log(object.answer) // 42
}
```


#### **getFilesFromStorage(inputBucketName)**

Recebe o nome do Bucket dentro do GCS e retorna a lista de objetos (arquivos) dentro dele.

**Argumentos**
- `inputBucketName`: String com o nome do bucket. Por exemplo, *gcp-functions-test-123*

**Retorno**
- **Array**: Array com objetos de metadados dos arquivos dentro do bucket. 

**Exemplo de código**

```
async function main(){
    let bucket = 'gcp-functions-test-123';
    let files = await getFilesFromStorage(bucket);
    let list = files.map(item=>item["name"]); //array com os nomes dos arquivos dentro do bucket gcp-functions-test-123
    console.log(list); // ['test.txt','test.json']
}
```


#### **createFileInStorage(outputBucketName,filePath, string)**

Cria um arquivo em um bucket com o conteúdo sendo uma string.

**Argumentos**
- `outputBucketName`: String com o nome do bucket. Por exemplo, *gcp-functions-test-123*
- `filePath`: String com o caminho/nome do arquivo a ser salvo. Exemplo: *arquivos/test.json*
- `string`: String de conteúdo do arquivo.


**Exemplo de código**

```
async function main(){
    let bucket = 'gcp-functions-test-123', filePath = 'arquivos/test.json';
    let guide = {};
    guide["answer"] = 42;
    guide["question"] = "Answer to the Ultimate Question of Life, the Universe, and Everything";
    let string = JSON.stringify(guide);
    await createFileInStorage(bucket,filePath,string);
}
```


#### **moveFiles(inputBucket,fileName,outputBucket)**

Move um arquivo do inputBucket para o outputBucket.

**Argumentos**
- `inputBucket`: String com o nome do bucket de entrada. Por exemplo, *gcp-functions-test-123*
- `fileName`: String com o caminho/nome do arquivo a ser movido. Exemplo: *arquivos/test.json*
- `outputBucket`: String com o nome do bucket de saída. Exemplo: *gcp-functions-output-123*


**Exemplo de código**

```
async function main(){
    let bucket = 'gcp-functions-test-123', filePath = 'arquivos/test.json', output = 'gcp-functions-output-123';
    await moveFiles(bucket, filePath, output);
    //File moved from gs://gcp-functions-test-123 to gs://gcp-functions-output-123/arquivos/test.json
}
```
