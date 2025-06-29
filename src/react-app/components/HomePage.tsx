import { useState } from 'react';
import { useGooglePicker, type PickerFile } from '../hooks/useGooglePicker';

const HomePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<PickerFile[]>([]);

  const { openPicker } = useGooglePicker({
    onSelect: (files) => {
      console.log('Selected files:', files);
      setSelectedFiles(files);
    },
  });

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Refilely</h1>
      <p className="mb-8">Google Driveからファイルを選択してアップロードします。</p>
      <button
        type="button"
        onClick={openPicker}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      >
        Google Driveからファイルを選択
      </button>

      {selectedFiles.length > 0 && (
        <div className="mt-8 text-left max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">選択されたファイル:</h2>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
            {selectedFiles.map((file) => (
              <li key={file.id} className="text-gray-800">
                {file.name} ({file.mimeType})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
