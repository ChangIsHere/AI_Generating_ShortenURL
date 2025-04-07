export default function ShortLinkCard({ originalUrl, shortLink }) {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortLink);
            alert('Done! Already been copied to clipboard!');
        } catch (err) {
            alert('Failed! Fail to copy, please try it manually!');
        }
    };

    return (
        <div className="bg-white shadow p-4 rounded border mb-6">
            <p className="text-sm text-gray-500 mb-1">orginal url:</p>
            <p className="break-all text-blue-900 mb-2">{originalUrl}</p>

            <p className="text-sm text-gray-500 mb-1">generated url:</p>
            <div className="flex items-center justify-between gap-2">
                <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                >
                    {shortLink}
                </a>
                <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-2 py-1 rounded"
                >
                    copy
                </button>
            </div>
        </div>
    );
}
