import { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);

  // Загрузка слов при старте
  useEffect(() => {
    const savedWords = localStorage.getItem('words');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  // Сохранение слов при изменении
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  // Добавление слова
  const addWord = () => {
    if (newWord.trim()) {
      setWords([...words, newWord.trim()]);
      setNewWord("");
    }
  };

  // Удаление выбранных слов
  const deleteSelected = () => {
    setWords(words.filter(word => !selectedWords.includes(word)));
    setSelectedWords([]);
  };

  // Выбор всех слов
  const selectAll = () => {
    if (selectedWords.length === words.length) {
      setSelectedWords([]);
    } else {
      setSelectedWords([...words]);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">English Words Collector</h1>
        
        {/* Ввод нового слова */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addWord()}
            placeholder="Enter word"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addWord}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Кнопки управления */}
        {words.length > 0 && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={selectAll}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              {selectedWords.length === words.length ? 'Unselect All' : 'Select All'}
            </button>
            {selectedWords.length > 0 && (
              <button
                onClick={deleteSelected}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete Selected ({selectedWords.length})
              </button>
            )}
          </div>
        )}

        {/* Список слов */}
        <div className="max-h-[200px] overflow-y-auto">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 border-b"
            >
              <input
                type="checkbox"
                checked={selectedWords.includes(word)}
                onChange={() => {
                  setSelectedWords(prev =>
                    prev.includes(word)
                      ? prev.filter(w => w !== word)
                      : [...prev, word]
                  );
                }}
              />
              <span>{word}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;