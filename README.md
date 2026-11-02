# 趣学

给人教版数学七年级上册用的静态小课。现在只有一课：1.1「正数和负数」，故事是「珠海海拔记录员」。

## 怎么打开

用浏览器打开 `index.html`，或在仓库根目录起一个静态服务器后访问首页。发布到 GitHub Pages 时，站点根目录就是本仓库根目录（Pages 需要你自己在仓库设置里打开，这个仓库不会改设置）。

首次打开并加载完成后，可以断网再刷新，课程仍然打得开。进度存在本机 `localStorage`，键名是 `zh-math7a-1-1`。不登录、不统计、不收集个人信息。

## 目录

- `index.html`：课程列表
- `math7a-1-1/index.html`：这一课（单文件，题目都在 `LESSON` 里）
- `sw.js`：离线缓存

第 4 关是海拔尺，页面上不出现「数轴」。显示用的负号是 Unicode「−」（U+2212）。

## 本地测试

在仓库根目录运行：

```bash
npm install
npx playwright install --with-deps chromium webkit
npm run verify
```

`npm test` 和 `npm run verify` 跑同一套 Playwright 测试。测试在 `127.0.0.1:4173` 起静态服务器，用 Chromium 和 WebKit 各跑三档尺寸。手机是 390×844。iPad 竖屏是 820×1180。iPad 横屏是 1180×820。三档都带触摸和 2 倍像素比。

每一档会点完各关和小测，包括答错和答对后的反馈。通过条件是没有控制台错误，没有发到本机以外的请求，页面没有横向溢出。截图在 `verify-output/` 下按项目分目录。该目录不进 git。
