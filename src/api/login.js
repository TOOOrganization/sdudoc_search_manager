import qs from "qs";

async function login(username, password){
    let result = ''
    await this.$axios.post('/user/login', qs.stringify({
            username: username,
            password: password
        })
    ).then(resp => {
        console.log(resp.data)
        if (resp.data.code === 200) {
            result = resp.data
            this.$message({
                showClose: true,
                message: resp.data.message,
                type: 'success'
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
        })
    return result
}

export{
    login
}