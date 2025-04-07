import { useState } from 'react';

export default function UrlInputForm({ onSubmit, loading }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            alert('please enter a valid url!');
            return;
        }
        onSubmit(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
                type="url"
                placeholder="Please enter an URL link, eg: https://example.com"
                className="flex-1 p-2 border border-gray-300 rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                style={{ marginLeft: '12px' }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Generating link'}
            </button>
        </form>
    );
}
