import logo from './logo.svg';
import './App.css';
const src = './1.pdf';
let componentLoaded = false


import(
  /* webpackChunkName: "pdfComponent" */
  /* webpackPrefetch: true */
  "dist/index.js").then(() => {
    componentLoaded = true
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      {!componentLoaded && <div>加载中...</div>}
      {componentLoaded && <pdf-view source={src}></pdf-view>}
    </div>
  );
}

export default App;
