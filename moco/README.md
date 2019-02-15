# Api Moco

> postman 作为接口调试服务的确很不错，但免费版每月只有 1000 次的 mock 请求次数。

## 运行

```bash
# 进度当前目录，并执行
java -Dfile.encoding=UTF-8 -jar moco-runner.jar http -p 8806 -g app.json
```