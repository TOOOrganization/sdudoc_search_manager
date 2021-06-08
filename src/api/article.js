import qs from "qs";

/**
 * 获取 solr 数据
 * @param coreName
 * @param defaultField
 * @param query
 * @param sort
 * @param start
 * @param rows
 * @param fields
 * @returns {Promise<string>}
 */
async function getSolrData(coreName, defaultField, query, sort, start, rows, fields){
    let result = ''
    await this.$axios.post('/solr/query',
        qs.stringify({
            coreName:coreName,
            defaultField:defaultField,
            query:query,
            sort:sort,
            start:start,
            rows:rows,
            fields:fields
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
            this.$message({
                showClose: true,
                type: 'success',
                message: '查询成功!'
            });

        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '查询失败，可能无权限',
                type: 'error'
            });
        })

    return result
}

/**
 * 获取 solr 分组数据
 * @param coreName
 * @param defaultField
 * @param query
 * @param sort
 * @param start
 * @param rows
 * @param group
 * @param fields
 * @returns {Promise<*[]>}
 */
async function getSolrGroupData(coreName, defaultField, query, sort, start, rows, group, fields){
    let result = []
    await this.$axios.post('/solr/groupQuery',
        qs.stringify({
            coreName:coreName,
            defaultField:defaultField,
            query:query,
            sort:sort,
            start:start,
            rows:rows,
            group:group,
            fields:fields
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            let data = JSON.parse(resp.data.data);
            for (let i=0; i<data[0].values.length; i++){
                result.push(data[0].values[i].groupValue)
            }
        }
    })
        .catch(failResponse => {
            console.log(failResponse)

        })
    console.log(result)
    return result
}

/**
 * 返回mongoDB指定collection的所有数据
 * @param connection
 * @returns {Promise<string>}
 */
async function findAll(connection){
    let result = ''
    await this.$axios.get('/'+connection+'/findAll'
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
            this.$message({
                showClose: true,
                type: 'success',
                message: '查询成功!'
            });
        }else {
            this.$message({
                showClose: true,
                message: resp.data.message,
                type: 'error'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '查询失败，可能无权限',
                type: 'error'
            });
        })
    return result
}

/**
 * 获取mongoDB中指定collection的所有_id
 * @param collection
 * @returns {Promise<*[]>}
 */
async function findAll_id(collection){
    let result = []
    await this.$axios.get('/'+collection+'/findAll_id'
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
        })
    return result
}

/**
 * 获取mongoDB中character、word所属的article
 * @param collection
 * @returns {Promise<*[]>}
 */
async function findAllArticle(collection){
    let result = []
    await this.$axios.get('/'+collection+'/findAllArticle'
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
        })
    return result
}

/**
 * 条件查询 mongoDB
 * @param collection
 * @param field
 * @param keyword
 * @returns {Promise<string>}
 */
async function find(collection, field, keyword){
    let result = ''
    await this.$axios.post('/'+collection+'/find',
        qs.stringify({
            field : field,
            keyword : keyword
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
            this.$message({
                showClose: true,
                type: 'success',
                message: '查询成功!'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '查询失败，可能无权限',
                type: 'error'
            });
        })
    return result
}

async function findMany(collection, field, keyword){
    let result = ''
    await this.$axios.post('/'+collection+'/findMany',
        qs.stringify({
            field : field,
            keyword : JSON.stringify(keyword)
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            result = JSON.parse(resp.data.data)
            this.$message({
                showClose: true,
                type: 'success',
                message: '查询成功!'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '查询失败，可能无权限',
                type: 'error'
            });
        })
    return result
}

/**
 * solr 删除一行
 * @param coreName
 * @param row
 * @returns {Promise<string>}
 */
async function deleteRow(coreName, row){
    console.log(row.id)
    let result = ''
    await this.$axios.post('/solr/delete',
        qs.stringify({
            coreName:'dms_article',
            id:row.id
        })
    ).then(resp => {
        if (resp) {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            result = 'success'
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            result = 'fail'
            this.$message({
                showClose: true,
                message: '删除失败，可能无权限',
                type: 'error'
            });
        })
    return result
}

/**
 * solr 删除多行
 * @param coreName
 * @param _idList
 * @returns {Promise<string>}
 */
async function deleteMany(coreName, _idList){
    console.log(_idList)
    let result =''
    await this.$axios.post('/solr/deleteMany',
        qs.stringify({
            coreName:coreName,
            _id: JSON.stringify(_idList)
        })
    ).then(resp => {
        if (resp) {
            result = 'success'
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            result = 'fail'
            this.$message({
                showClose: true,
                message: '删除失败，可能无权限',
                type: 'error'
            });
        })
    return result

}

/**
 * mongoDB 删除一个文档
 * @param collection
 * @returns {Promise<string>}
 */
async function deleteRowMongo(collection, row){
    let result = ''
    await this.$axios.post('/'+collection+'/delete',
        qs.stringify({
            id:row._id
        })
    ).then(resp => {
        if (resp) {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            result = 'success'
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            result = 'fail'
            this.$message({
                showClose: true,
                message: '删除失败，可能无权限',
                type: 'error'
            });
        })
    return result
}

async function deleteManyMongo(collection, entities){
    console.log(entities)
    let result =''
    await this.$axios.post('/'+collection+'/deleteMany',
        qs.stringify({
            entities: JSON.stringify(entities)
        })
    ).then(resp => {
        if (resp) {
            result = 'success'
            this.$message({
                showClose: true,
                type: 'success',
                message: '删除成功!'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            result = 'fail'
            this.$message({
                showClose: true,
                message: '删除失败，可能无权限',
                type: 'error'
            });
        })
    return result

}

export {
    getSolrData,
    getSolrGroupData,
    findAll,
    findAll_id,
    findAllArticle,
    find,
    findMany,
    deleteRow,
    deleteMany,
    deleteRowMongo,
    deleteManyMongo
}