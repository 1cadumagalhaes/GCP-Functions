async function getDataFromDataStore(tipoEntidade){
    const {Datastore} = require('@google-cloud/datastore');
    const datastore = new Datastore();
    const [config] = await datastore.createQuery(tipoEntidade).run();
    const data = config.length==1 ? config[0] : config;
    return data;
}

//Retorna o json da entidade escolhida. Caso haja mais de uma entidade do mesmo tipo, retorna um array com as entidades
