// src/App.tsx

import { useState } from "react";
import "./App.css";

function App() {
	const [name, setName] = useState("unknown");

	return (
		<>
			<button
				type="submit"
				onClick={() => {
					fetch("/api/")
						.then((res) => res.json() as Promise<{ name: string }>)
						.then((data) => setName(data.name));
				}}
				aria-label="get name"
				className="bg-blue-500"
			>
				ファイルをアップロード {name}
			</button>
		</>
	);
}

export default App;
