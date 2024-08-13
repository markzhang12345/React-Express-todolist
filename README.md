# React-Express-todolist

## 使用方法

使用`git clone`将项目 clone 到本地。

使用`npm i`下载相应依赖。

运行`num run start`或`npm run dev`启动前端部分的运行或调试模式。

运行`npm run serverstart`或`npm run devstart`启动后端部分运行或调试模式。

- 前端运行在端口`localhost:3000`上，后端运行在端口'localhost:5000`上。
- 后端部分的调试模式使用了`nodemon`，请在使用前确有本地安装或全局安装的对应依赖，可使用`npm i nodemon`。
- 前端部分的`next.js`使用的为 13.0.0 版本的页面路由，若在安装依赖时更新至 14.0.0 以上版本，可能会导致项目启动失败，请手动退回至 13.0.0 版本。

## 实现功能

使用`next.js`实现了多页面导航。

使用`express`实现了对前端请求的处理和响应，建立了与`mongodb`的连接。

使用` mongodb` 实现了较长时间内的数据持久化，使用了 cookie 实现了 1 小时内的登录状态持久化。

使用 JSON Web Token 实现了基于 Token 的身份验证机制。
