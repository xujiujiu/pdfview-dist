<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <button @click="add">+</button>
    <button @click="remove">-</button>
    <div v-if="!componentLoaded">加载中...</div>
    <pdf-view
      id="pdfView"
      v-else
      :source="src"
      :scale="scale"
      :max-zoom="3"
      @readFinish="readFinish"
      @numUpdate="updateNum"
      @percentUpdate="percentUpdate"
      @pdfInitialized="pdfInitialized"
    ></pdf-view>
    <button @click="setZoomScale">控制缩放</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const src = ref("./1.pdf").value;
let scale = ref(1).value;
let zoomEnable = ref(true).value;
let componentLoaded = ref(false);
onMounted(() => {
  import(
    /* webpackChunkName: "pdfview" */
    /* webpackPrefetch: true */
    "pdfview"
    // "../../../../dist/index.js"
  ).then(() => {
    componentLoaded.value = true;
  });
});
function add() {
  scale.value += 0.2;
}

function remove() {
  scale.value += 0.2;
}

function clear() {
  let pdfView = document.getElementById("pdfView");
  pdfView.clearPdf();
}

function setZoomScale() {
  let pdfView = document.getElementById("pdfView");
  const enbale = !zoomEnable.value;
  pdfView.disabledZoom(enbale);
  zoomEnable.value = enbale;
}

function readFinish(e) {
  console.log("readFinish", e);
}
function pdfInitialized(e) {
  console.log("pdf 已完成初始化", e);
}
function percentUpdate(e) {
  console.log("pdf 加载进度", e);
}
function updateNum(e) {
  console.log("当前页码信息", e);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 50vh;
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
