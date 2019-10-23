const vision = require('@google-cloud/vision').v1;
const {Datastore} = require('@google-cloud/datastore');

const mimeType= 'application/pdf'; 

exports.extractText = async (data,context) =>{
    try{
        const bucket = await getBucket();
        const gcsDestinationUri = `gs://${bucket}-visionoutput/` ;
        asyncExtractText(data, gcsDestinationUri);
    }catch(e){
        console.error(e);
    }
};


async function getBucket(){
    return ;
}

async function asyncExtractText(data, gcsDestinationUri){
    const client = new vision.ImageAnnotatorClient();

    const bucket = data["bucket"];
    const filename = data["name"];
    console.log(`Scheduling text extraction from pdf ${filename}...`);

    const batchSize = 1;  //Quantas páginas são agrupadas em cada json de output
    const gcsSource = `gs://${bucket}/${filename}`;
    const gcsDestination = gcsDestinationUri + filename.split('/').pop().split('.')[0] + '/';

    const inputConfig = {
        mimeType,
        gcsSource: {
            uri: gcsSource
        },
    };

    const outputConfig = {
        gcsDestination:{
            uri: gcsDestination
        },
        batchSize,
    };

    const features = [{type:'DOCUMENT_TEXT_DETECTION'}]; //TEXT_DETECTION

    const request = {
        requests: [{
            inputConfig,
            features,
            outputConfig,
        }],
    };

    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();
    const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);

}
