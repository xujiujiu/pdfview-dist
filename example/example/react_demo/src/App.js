import { useEffect, useState } from 'react';
import './App.css';

const src = './1.pdf';


function App() {
  let [componentLoaded, setComponentLoaded] = useState(false)


  useEffect(() => {
    import(
      /* webpackChunkName: "pdfview" */
      /* webpackPrefetch: true */
      "pdfview").then(() => {
        setComponentLoaded(true)
      });
  }, [])

  return (
    <div className="App">
      <div>自定义组件模式</div>
      {!componentLoaded && <div>加载中...</div>}
      {componentLoaded && <pdf-view source={src}></pdf-view>}
      <div>js调用模式</div>
      <div id="pdf-dom"></div>
    </div>
  );
}

export default App;
