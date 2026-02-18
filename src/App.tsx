import { Route, Routes } from "react-router";
import Header from "./component/Hearder";
import WordList from "./component/WordList";
import FlashCards from "./component/FlashCards";
import RepeatWords from "./component/RepeatWords";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/word-list" element={<WordList />} />
        <Route path="/flash-cards" element={<FlashCards />} />
        <Route path="/repeat-words" element={<RepeatWords />} />
      </Routes>
    </>
  );
}

export default App;
