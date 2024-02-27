import { useCallback, useEffect, useState } from 'react';
import { InputActionMeta, MultiValue } from 'react-select';
import { Character, getCharacters } from 'rickmortyapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MultiSelect from './components/MultiSelect';
import './App.css';

function App() {
  const [characters, setCharacters] = useState<Character[]>(() => []);
  const [charactersSelected, setCharactersSelected] = useState<Character[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getCharacters({
      name: searchInput,
    })
      .then((response) => {
        setCharacters(response.data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error fetching characters');
        setLoading(false);
      });
  }, [searchInput]);

  const handleInputChange = useCallback((inputValue: string, actionMeta: InputActionMeta) => {
    if (inputValue !== '' || actionMeta.action === 'input-change') {
      setSearchInput(inputValue);
    }
    if (inputValue === '' && actionMeta.action === 'input-blur') {
      setSearchInput('');
    }
  }, []);

  const handleValueChange = useCallback((selected: MultiValue<Character>) => {
    setCharactersSelected(selected as Character[]);
    console.log('Selected characters: ', selected);
  }, []);

  return (
    <>
      <div className="card">
        <MultiSelect
          options={characters}
          value={charactersSelected}
          onChange={handleValueChange}
          onInputChange={handleInputChange}
          loading={loading}
        />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
