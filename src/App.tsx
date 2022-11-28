import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Builder from './components/builder';
import BuilderComponent from './components/builder/builderComponent';
import Main from './components/main';
import { formData } from './components/templates/formData';
import './tds-fonts.css';
import { page } from './components/templates/page';

const MainTemplate = ({template}:any) => <BuilderComponent template={{...template}} />
const InputTemplate = ({template}:any) => <BuilderComponent template={{...template}} />

function App() {

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route index element={<Main />} />
          {/* <Route path="builder" element={<Builder />} /> */}

          <Route path="builder" element={<Builder />}>
            <Route  key="mainPage" path="mainPage" element={<MainTemplate template={page} />} />
            <Route key="input" path="input" element={<InputTemplate template={formData}/>} />
            <Route key="dropdown" path="dropdown" element={<>dropdown</>} />
            

            <Route path="*" element={<div>No Page</div>} />
          </Route>
          <Route path="*" element={<div>No Page</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
