const qiniu = require('qiniu');
const urlPrefix = '自己的七牛云配置的域名' // 如 https://www.baidu.com/
const prefix = 'image/blog/' //配置的前缀 如 https://www.baidu.com/image/blog/

function qiniuToken () {
    var accessKey = '自己的七牛云accessKey';
    var secretKey = '自己的七牛云secretKey';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: '自己的七牛云空间名',
        // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    return uploadToken
}

function upload_file (file_name, file_path) {
    // 保存到七牛的地址
    const file_save_path = prefix + file_name
 
    // 七牛上传的token
    const up_token = qiniuToken()
 
    const extra = new qiniu.form_up.PutExtra()
    
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2

    const formUploader = new qiniu.form_up.FormUploader(config)
 
    return new Promise(function (resolve, reject) {
        // 上传文件
        formUploader.putFile(up_token, file_save_path, file_path, extra, (err, ret) => {
            if (!err) {
                if (ret.key) {
                    // 上传成功， 处理返回值
                    console.log('上传成功', ret);
                    resolve({ url: urlPrefix + ret.key })
                } else {
                    reject('缺失key')
                }
            } else {
                // 上传失败， 处理返回代码
                console.error('上传失败', err);
                reject(err)
            }
        });
    })
}


module.exports = { qiniuToken, upload_file }