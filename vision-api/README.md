# Cloud Function utilizando VisionApi

## Funcionamento

Essa cloud function tem o trigger do tipo storage configurado no bucket onde serão guardados os pdfs.

Toda vez que um arquivo for colocado dentro do bucket, a cloud function é disparada e executa a chamada da vision api.

Nesse caso está sendo utilizado o comportamento padrão, onde a saída da API é salva no bucket *outputBucket*, na forma de arquivos json contendo os dados da extração.

Pode-se ler a saída bruta de texto utilizando a seguinte estrutura:
```
async function main(){
    let bucket = outputBucket, fileName='output-1-1.json';
    let str = await getFileStringFromStorage(bucket,fileName);
    let json = JSON.parse(str);
    let text = json["responses"][0]["fullTextAnnotation"]["text"];
}

```
