module.exports={
    lintOnSave:false,  //禁用eslint
    devServer: {
        proxy: {
          '/api': {
            target: 'http://123.57.205.78',  //z转发的目标服务器地址
            // pathRewrite: { '^/api': '' },  //是否把路径中的/api去掉  看接口路径里面有没有  有就不去
          },
        },
      },
}