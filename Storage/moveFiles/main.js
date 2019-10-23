const {Storage} = require('@google-cloud/storage');


exports.moveFiles = async (data,context) => {
    try {
        let {bucket, name} = data;
        let outputBucket = "outputBucket"
        await movefiles(bucket,name,outputBucket);
    } catch (e) {
        console.error(e);
    }
};




async function movefiles(inputBucket,fileName,outputBucket){
    const storage = new Storage();
    let newLocation = `gs://${outputBucket}/${fileName}`;
    await storage.bucket(inputBucket).file(fileName).move(newLocation).catch(e=>console.error(e));
    console.log(`File moved from gs://${inputBucket} to gs://${newLocation}`);
  }