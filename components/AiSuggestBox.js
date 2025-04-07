export default function AiSuggestBox({ alias, summary }) {
    if (!alias && !summary) return null; // no data no show

    return (
        <div className="bg-gray-50 border border-gray-300 p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-2">AI suggestions</h2>

            {alias && (
                <div className="mb-3">
                    <p className="text-sm text-gray-500">recommended alias: </p>
                    <p className="text-blue-800 font-medium">/{alias}</p>
                </div>
            )}

            {summary && (
                <div>
                    <p className="text-sm text-gray-500">summary: </p>
                    <p className="text-gray-700 italic">{summary}</p>
                </div>
            )}
        </div>
    );
}
