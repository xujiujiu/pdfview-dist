<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div>
      <button @click="add">+</button>
      <button @click="remove">-</button>
    </div>
    <div>
      <button @click="clear">清理pdf 内容</button>
    </div>
    <div>跳转第<input type="number" @input="changeNum" v-model="data.number" />页</div>
    <div><button @click="setZoomScale">控制缩放</button></div>
    <h2>自定义组件模式</h2>
    <div v-if="!data.componentLoaded">加载中...</div>
    <pdf-view
      id="pdfView"
      v-else
      :source="data.src"
      :scale="data.scale"
      :max-zoom="3"
      :height="300"
      @readFinish="readFinish"
      @numUpdate="updateNum"
      @progress="progress"
      @ready="ready"
    ></pdf-view>
    <h2>js调用模式</h2>
    <div id="pdf-dom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import "pdfview/dist/index.css";
let data = reactive({
  src: "./1.pdf",
  zoomEnable: true,
  componentLoaded: false,
  number: 1,
  scale: 1,
  pdfViewLib: null
});
onMounted(() => {
  import("pdfview").then((module) => {
    module.PdfViewRegistry("pdf-view");
    data.componentLoaded = true;
    // 模块调用模式
    data.pdfViewLib = new module.PdfViewLib("#pdf-dom", {
      source: data.src,
      maxZoom: 5,
      height: 300
    });

    data.pdfViewLib.on("ready", (e) => {
      console.log("pdf lib 已完成初始化", e);
    });
    data.pdfViewLib.on("progress", (e) => {
      console.log("pdf lib 加载进度", e);
    });
    data.pdfViewLib.on("readFinish", (e) => {
      console.log("readFinish", e);
    });
    data.pdfViewLib.on("error", (e) => {
      console.log("error", e);
    });
  });
});
function add() {
  data.scale += 0.2;
  data.pdfViewLib.setScale(data.scale);
}

function remove() {
  data.scale -= 0.2;
  data.pdfViewLib.setScale(data.scale);
}

function clear() {
  let pdfView = document.getElementById("pdfView");
  pdfView.clearPdf();
  data.pdfViewLib.clearPdf();
}

function setZoomScale() {
  let pdfView = document.getElementById("pdfView");
  const enbale = !data.zoomEnable;
  data.zoomEnable = enbale;
  pdfView.setZoom(enbale);
  data.pdfViewLib.setZoom(enbale);
}

function readFinish(e) {
  console.log("readFinish", e);
}

function changeNum() {
  let pdfView = document.getElementById("pdfView");
  pdfView.goto(data.number);
  data.pdfViewLib.goto(data.number);
  console.log("跳转的页码：", data.number);
}
function ready(e) {
  console.log("pdf 已完成初始化", e);
}
function progress(e) {
  console.log("pdf 加载进度", e);
}
function updateNum(e) {
  console.log("当前页码信息", e);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100vh;
  overflow: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
