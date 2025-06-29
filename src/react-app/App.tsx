import { useState } from "react";
import Settings from "./components/SettingsPage";
import HomePage from "./components/HomePage";

function App() {
	const [showSettings, setShowSettings] = useState(false);
	const [showHomePage, setShowHomePage] = useState(false);
	const [name, setName] = useState("unknown");

	if (showSettings) {
		return <Settings onNavigateBack={() => setShowSettings(false)} />;
	}

	if (showHomePage) {
		return <HomePage />;
	}

	return (
		<div className="flex flex-col gap-2 p-4 items-start">
			<h1 className="text-2xl font-bold mb-4">Refilely</h1>

			<button
				type="button"
				onClick={() => {
					fetch("/api/")
						.then((res) => res.json() as Promise<{ name: string }>)
						.then((data) => setName(data.name));
				}}
				aria-label="get name"
				className="rounded-xl bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-600"
			>
				APIテスト {name}
			</button>

			<button
				type="button"
				onClick={() => setShowHomePage(true)}
				className="mt-4 rounded-xl bg-gray-200 px-4 py-2 border border-gray-400 hover:bg-gray-300"
			>
				ファイルをアップロード
			</button>

			{/* TODO: ファイル名入力エリア */}

			{/* TODO: ファイルを保存ボタン */}

			{/* TODO: アップロード済みファイル一覧 */}

			<button
				type="button"
				onClick={() => setShowSettings(true)}
				className="mt-4 rounded-xl bg-gray-200 px-4 py-2 border border-gray-400 hover:bg-gray-300"
			>
				設定
			</button>
		</div>
	);
}

export default App;
