import './App.css';
import './i18n';
import Form from './components/Form/Form';

function App() {
  const name: string = 'Welt';

  console.log(name);
  return (
    <div className="">
      <Form />
      <p className="text-center text-gray-500 text-xs">
        &copy;2025 Reload Festival. All rights reserved.
      </p>
    </div>
  );
}

export default App;
