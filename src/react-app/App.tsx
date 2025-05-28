import { useState } from "react";

function App() {
	const [name, setName] = useState("unknown");

	return (
		<div className="p-4">
			<button
				type="submit"
				onClick={() => {
					fetch("/api/")
						.then((res) => res.json() as Promise<{ name: string }>)
						.then((data) => setName(data.name));
				}}
				aria-label="get name"
				className="rounded-xl bg-gray-300 px-2 py-1 border border-gray-400 hover:bg-gray-400"
			>
				ファイルをアップロード {name}
			</button>
		</div>
	);
}

export default App;
