import { useState } from "react";

interface SettingsProps {
	onNavigateBack: () => void;
}

function Settings({ onNavigateBack }: SettingsProps) {
	const [isLinked, setIsLinked] = useState(false);
	const [userEmail, setUserEmail] = useState<string | null>(null);

	const handleLinkAccount = () => {
		// TODO: Implement actual Google Account linking logic
		console.log("Attempting to link Google Account...");
		setIsLinked(true);
		setUserEmail("user@example.com"); // Placeholder email
	};

	const handleUnlinkAccount = () => {
		// TODO: Implement actual Google Account unlinking logic
		console.log("Attempting to unlink Google Account...");
		setIsLinked(false);
		setUserEmail(null);
	};

	return (
		<div className="p-4 flex flex-col gap-4 items-start">
			<h1 className="text-2xl font-bold mb-4">Googleアカウント設定</h1>

			{isLinked ? (
				<div className="flex flex-col gap-2 items-start">
					<p className="text-green-600">Googleアカウント連携済み: {userEmail}</p>
					<button
						type="button"
						onClick={handleUnlinkAccount}
						className="rounded-xl bg-red-500 text-white px-4 py-2 hover:bg-red-600"
					>
						連携解除
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-2 items-start">
					<p className="text-gray-600">Googleアカウントはまだ連携されていません。</p>
					<button
						type="button"
						onClick={handleLinkAccount}
						className="rounded-xl bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
					>
						Googleアカウント連携
					</button>
				</div>
			)}

			<button
				type="button"
				onClick={onNavigateBack}
				className="mt-6 rounded-xl bg-gray-200 px-4 py-2 border border-gray-400 hover:bg-gray-300"
			>
				戻る
			</button>
		</div>
	);
}

export default Settings;
