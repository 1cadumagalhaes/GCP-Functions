# DataStore

### getDataFromDataStore(tipoEntidade)

Recebe o tipo de entidade do DataStore, e retorna o objeto encontrado, se houver somente
uma entidade, ou um array de objetos.

**Argumentos**
- `tipoEntidade`: A string do tipo de entidade cadastrada no DataStore. 

**Retorno**
- **Object**: Objeto na estrutura JSON com o conteúdo da entidade no DataStore.
- **Array**: Array de objetos com as entidades do tipo.

**Exemplo de código**


```
    let configuracoes = await getDataFromDataStore('config');
```