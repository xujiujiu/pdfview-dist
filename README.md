# pdfview

在移动端 h5 能够直接通过使用 <pdf-view> 标签来展示 pdf 阅读器功能的组件

## 使用方式

安装依赖
```
npm i pdfview
```
模块提供了2种使用方式，支持一些不支持使用 webComponent 的 场景

### webcomponent 组件注册模式

```js
import { PdfViewRegistry } "pdfview"
// 注册自定义组件名
PdfViewRegistry('pdf-view')
```

在页面中正常使用

```html
<pdf-view source="http://xxx.pdf"></pdf-view>

```
### 模块调用模式

```js
import { PdfViewLib } "pdfview"
```

在页面中正常使用

```html
<div id="pdf-com"></div>
```

```js
const pdfViewLib = new PdfViewLib('#pdf-com', {
  source: this.source,
  maxZoom: 5,
  height: 200,
})

pdfViewLib.on('progress', (data) => {
  console.log('progress', data)
})
pdfViewLib.on('readFinish', (data) => {
  console.log('readFinish', data)
})
pdfViewLib.on('error', (data) => {
  console.log('error', data)
}) 
```
### 示例

若使用了 webComponent 标准的组件模式，在使用时需要在工程中配置编译时忽略编译，避免编译时出现 warning。 如 vue 环境中，可在 beforeCreate 中忽略 pdf-view 的编译：

```js
const App = {
  beforeCreate() {
    Vue.config.ignoredElements.push('pdf-view')
  }
}
```

若按需加载组件，如只在某个页面中使用，由于 pdf 组件在弱网环境下，加载较慢。为了更好的体验，可以使用加载状态的占位符和渲染条件判断，来控制 pdf 组件的显示

``` js
// template
// 调用模式组件
<div id="pdf-com"></div>
// 自定义组件
<pdf-view v-if="componentLoaded" :source="source" height="400"></pdf-view>
<loader v-if="!componentLoaded" ></loader>


// js
created() {
      // 具体参数参考 https://webpack.js.org/api/module-methods/#magic-comments
    import(
    /* webpackChunkName: "pdfview" */
    /* webpackPrefetch: true */
    "pdfview").then(module => {
      // webcomponent 组件注册模式
      module.PdfViewRegistry('pdf-view')
      this.componentLoaded = true
      // 模块调用模式
      const pdfViewLib = new module.PdfViewLib('#pdf-com', {
        source: this.source,
        maxZoom: 5,
        height: 200,
      })

      pdfViewLib.on('progress', (data) => {
        console.log('progress', data)
      })
      pdfViewLib.on('readFinish', (data) => {
        console.log('readFinish', data)
      })
      pdfViewLib.on('error', (data) => {
        console.log('error', data)
      })
    });
},
```

## API

| 属性             | 类型    | 默认值 | 必填 | 说明                                                                     |
| ---------------- | ------- | ------ | ---- | --------------------------------------------------------------------- |
| source           | string  | ArrayBuffer  | ''     | 是   | pdf资源，支持http协议或ArrayBuffer 类型数据                 |
| width            | number  |        | 否   | 组件宽度，默认100%                                                      |
| height           | number  |        | 否   | 组件高度，默认100%                                                      |
| limit            | number  |        | 否   | 最大渲染 pdf 的页数                                                     |
| cmap-url         | string  |        | 否   | 字体的cmaps文件夹路径，如 https://unpkg.com/pdfjs-dist@2.5.207/cmaps/    |
| hide-page-num    | boolean | false  | 否   | 不展示左上角页码                                                        |
| scale            | number  | 1      | 否   | 当前展示倍数，默认1倍                                                    |
| max-zoom         | number  | 2      | 否   | 双击缩放倍数，范围1+                                                    |
| zoom-disabled    | boolean | false  | 否   | 是否关闭双击缩放                                                        |
| canvas-id-prefix | string  |        | 否   | canvas id 前缀                                                        |

## on事件


| 事件名        | 出参 | 说明           |
| ---------------- | ------- | ------ |
| readFinish   |  { finishReading: boolean } | 是否已完成阅读事件 | 
| numUpdate   |  { currentNum: number } | 当前阅读到的页码更新事件 | 
| progress   |  { progress: number } | pdf 加载进度事件 | 
| ready   |  { title: string （pdf 标题）, totalPage: number （总页码） } | pdf 加载完成事件 | 
| error   |  { code: number, message: 错误提示 } | 是否已完成阅读事件 | 



## 函数方法

| 方法名  | 入参   | 传参取值 | 说明                  |
| ------- | ------ | ------ |--------------------- |
| setZoom | Boolean |  默认为false | 控制双击缩放功能 |
| goto    | Number |     | 跳转第几页 ｜
| clearPdf    |  |   | 清除pdf 渲染内容 |



## 兼容性：

| 系统  | 版本   | 说明                  |
| ------- | ------ | --------------------- |
| ios    | 11.1+ | - |
| andriod | 8.1+ | -  |
| chrome | 78+ | -  |
| safari  | 11.1+ | - |

## 依赖
| 插件名  | 版本   | 说明                  |
| ------- | ------ | --------------------- |
| pdfjs-dist | 2.5.207 | - |