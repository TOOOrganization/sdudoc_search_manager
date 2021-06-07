import qs from "qs";

/**
 * 查询用户的所有角色
 * @param userId
 * @returns {Promise<string>}
 */
async function selectRoleForUser(userId){
    let result = ''
    await this.$axios.post('/ds2_authority/selectRoleForUser', qs.stringify({
        userId: userId
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            result = resp.data.data
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
        })
    return result
}

/**
 * 给用户授权角色
 * @param userId
 * @param roleId
 * @param ds
 * @returns {Promise<string>}
 */
async function authorizeUser(userId, roleId, ds){
    let result = ''
    await this.$axios.post('/' + ds + '_authority/authorizeUser', qs.stringify({
        userId: userId,
        roleId: roleId
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            console.log(resp.data.data)
            result = resp.data.data
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
        })
    return result
}

async function updateUserRole(userId, roleId, ds){
    let result = ''
    await this.$axios.post('/' + ds + '_user_role_relation/update', qs.stringify({
            userId: userId,
            roleId: roleId
        })
    ).then(resp => {
        if (resp.data.code === 200) {
            console.log(resp.data.data)
            result = resp.data.data
            this.$message({
                showClose: true,
                message: '角色修改成功',
                type: 'success'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '角色修改失败',
                type: 'error'
            });
        })
    return result
}

async function addOneUser(user, ds){
    let result = ''
    await this.$axios.post('/' + ds + '_user/insert',{
        user
        }
    ).then(resp => {
        if (resp.data) {
            result = resp.data
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
        })
    return result
}

async function deleteOneUser(userId, ds){
    let result = ''
    await this.$axios.post('/' + ds + '_user/delete', qs.stringify({
            userId: userId
        })
    ).then(resp => {
        if (resp) {
            this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
            });
        }
    })
        .catch(failResponse => {
            console.log(failResponse)
            this.$message({
                showClose: true,
                message: '删除失败',
                type: 'error'
            });
        })
    return result
}
export {
    selectRoleForUser,
    authorizeUser,
    updateUserRole,
    addOneUser,
    deleteOneUser
}