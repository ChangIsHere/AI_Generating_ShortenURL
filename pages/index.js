import { useState, useEffect } from 'react';
import UrlInputForm from '../components/UrlInputForm';  // URL 输入
import ShortLinkCard from '../components/ShortLinkCard'; // 结果展示
import AiSuggestBox from '../components/AiSuggestBox';   // AI 别名与摘要
import HistoryList from '../components/HistoryList';     // 历史记录

export default function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [alias, setAlias] = useState('');
    const [summary, setSummary] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // 加载本地历史记录
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('linkHistory')) || [];
        setHistory(stored);
    }, []);

    // 保存记录
    const saveToHistory = (entry) => {
        const newHistory = [entry, ...history];
        setHistory(newHistory);
        localStorage.setItem('linkHistory', JSON.stringify(newHistory));
    };

    // 主处理函数
    const handleShorten = async (url) => {
        setShortLink('');
        setAlias('');
        setSummary('');
        setLoading(true);
        setOriginalUrl(url);

        try {
            // 请求短链
            const shortRes = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const shortData = await shortRes.json();
            const shortUrl = shortData.result_url;
            if (!shortUrl) {
                alert('Failed to generate short link.');
                setLoading(false);
                return;
            }

            setShortLink(shortUrl);

            // 请求 AI 别名（可失败）
            let aliasText = '';
            try {
                const aliasRes = await fetch('/api/ai-alias', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url }),
                });
                const aliasData = await aliasRes.json();
                aliasText = aliasData.alias || '';
                setAlias(aliasText);
            } catch {
                setAlias('');
            }

            // 请求 AI 摘要（可失败）
            let summaryText = '';
            try {
                const sumRes = await fetch('/api/ai-summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url }),
                });
                const sumData = await sumRes.json();
                summaryText = sumData.summary || '';
                setSummary(summaryText);
            } catch {
                setSummary('');
            }

            saveToHistory({
                original: url,
                short: shortUrl,
                alias: aliasText,
                summary: summaryText,
            });

        } catch (err) {
            alert('Network or API error. 请检查网络或API配置。');
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="main-card">
            <h1 className="main-title">🔗 SmartLink · AI URL shortened</h1>

            <UrlInputForm onSubmit={handleShorten} loading={loading} />

            {shortLink && (
                <div className="result-box">
                    <ShortLinkCard originalUrl={originalUrl} shortLink={shortLink} />
                    <AiSuggestBox alias={alias} summary={summary} />
                </div>
            )}

            <div className="result-box">
                <HistoryList history={history} />
            </div>
        </div>
    );
}
