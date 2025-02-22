import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';


function App() {
  const { t } = useTranslation();

  const name : string =  "Welt";

  console.log(name);
  return (
    <>
      <h1 className="text-3xl font-bold underline">
      {t('greeting', { name })}
        !</h1>
    </>
  );
}

export default App;
