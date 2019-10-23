async function getFileStringFromStorage(inputBucketName,fileName){
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    let file = storage.bucket(inputBucketName).file(fileName);
    let contentString = await file.download().then(function(data) {
        return data[0].toString('utf8');
      });
    return contentString;
}

//Recebe o bucket e o nome do arquivo e retorna a string do arquivo. 


async function getFilesFromStorage(inputBucketName){
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  let files = storage.bucket(inputBucketName).getFiles().then(data=>data[0]);
  return files;
}

//Recebe o nome do bucket e retorna um array com os metadados de todos os arquivos dentro do bucket


async function createFileInStorage(outputBucketName,filePath, string){
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  var destinationBucket= storage.bucket(outputBucketName);
  console.log("trying to create file")
  const file = destinationBucket.file(filePath);
  await file.save(string);
  console.log(`File ${filePath} created in gs://${outputBucketName}`)
}

//Recebe o nome do bucket, o caminho/nome.extensão do arquivo e a string de conteúdo e salva no Cloud Storage


async function movefiles(inputBucket,fileName,outputBucket){
  const storage = new Storage();
  let newLocation = `gs://${outputBucket}/${fileName}`;
  await storage.bucket(inputBucket).file(fileName).move(newLocation).catch(e=>console.error(e));
  console.log(`File moved from gs://${inputBucket} to gs://${newLocation}`);
}

//Recebe o bucket e arquivo de entrada, e move para o outputBucket.

