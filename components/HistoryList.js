export default function HistoryList({ history }) {
    if (!history.length) return null;

    return (
        <div className="result-box">
            <h2 className="main-title" style={{ fontSize: '24px', marginBottom: '24px' }}>
                📜 History record
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {history.map((item, idx) => (
                    <div key={idx} className="main-card" style={{
                        padding: '24px', animation: 'fadeIn 0.5s', maxWidth: '100%',
                        wordBreak: 'break-word',
                        boxSizing: 'border-box'
                    }}>
                        {/* 原始链接 */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <span className="label-bubble">Original URL:</span>
                            <p style={{ wordBreak: 'break-all', color: '#1a237e', margin: 0 }}>{item.original}</p>
                        </div>

                        {/* 短链接 */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <span className="label-bubble">New URL:</span>
                            <a
                                href={item.short}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#1e88e5', textDecoration: 'underline', wordBreak: 'break-all' }}
                            >
                                {item.short}
                            </a>
                        </div>

                        {/* AI Alias */}
                        {item.alias && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <span className="label-bubble">Alias:</span>
                                <span style={{ color: '#3949ab', fontWeight: 600 }}>/{item.alias}</span>
                            </div>
                        )}

                        {/* AI Summary */}
                        {item.summary && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px' }}>
                                <span className="label-bubble">Summary:</span>
                                <p style={{ color: '#555', fontStyle: 'italic', margin: 0 }}>{item.summary}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
