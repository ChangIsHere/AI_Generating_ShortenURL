// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* 引入 Google 字体 */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
