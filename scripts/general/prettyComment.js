export function main() {
    /**
     * li要素から直下のテキストのみ抽出し、元のテキストは削除
     * @param {HTMLLIElement} li
     * @returns {String}
     */
    const getChildText = li => {
        for (let i = 0; i < li.childNodes.length; i++) {
            const elm = li.childNodes[i];
            if (
                elm.nodeName === '#text'
                && elm.textContent.match(/^\s+$/) === null
            ) {
                const text = elm.textContent;
                elm.textContent = '';

                return text;
            }
        }

        return '';
    };
    /**
     * 投稿情報を取得
     * 投稿形式：コメント␣---␣投稿者名␣(2000/01/01␣00:00:00)\n␣␣...
     * @param {String} post
     * @returns {RegExpMatchArray} 引数が適切なコメント形式だった場合
     * @returns {Object} 上記以外
     */
    const getPostData = post => post.match(
        /^\s*(?<comment>.+) --- (?<user>.*) \((?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2}) (?<h>\d{2}):(?<m>\d{2}):(?<s>\d{2})\)\s*$/
    )?.groups ?? {};
    /**
     * span要素をクラスを付与して生成
     * @param {Array} spanClasses
     * @returns {HTMLSpanElement}
     */
    const createSpanWithClass = (...spanClasses) => {
        const SPAN = document.createElement('span');
        if (spanClasses.length > 0) SPAN.classList.add(...spanClasses);
        return SPAN;
    };

    const PROPERTY = "postData"//Symbol("コメントのHTML要素に設定する投稿データ");

    {//再構成＆デザイン適用
        const COMMENTS = document.querySelectorAll('ul.user_comment_list li');
        [...COMMENTS].forEach(li => {
            const DATA = getPostData(getChildText(li));

            const POST = createSpanWithClass('comment_parent');
            {//投稿情報の要素
                const INFO = createSpanWithClass('comment_info');
                (parentSpan => {//  親Span要素内に投稿情報の子Span要素を挿入
                    {//投稿者名
                        const SPAN = createSpanWithClass('comment_user');
                        SPAN.textContent = DATA.user === '' ? '名無し' : DATA.user;
                        if (DATA.user === '') SPAN.style.color = "var(--c-text_black)";
                        parentSpan.appendChild(SPAN);
                    }
                    {//投稿日時
                        const SPAN = createSpanWithClass('comment_date');
                        SPAN.textContent = `${DATA.year}年${DATA.month}月${DATA.day}日 ${DATA.h}:${DATA.m}:${DATA.s}`;
                        parentSpan.appendChild(SPAN);
                    }
                })(INFO);
                POST.appendChild(INFO);
            }
            {//コメント本文
                const TEXT = createSpanWithClass();
                TEXT.textContent = DATA.comment;
                POST.appendChild(TEXT);
            }

            POST[PROPERTY] = DATA;//投稿に関するデータを登録

            (sibling => {
                if (sibling) {
                    sibling.before(POST);
                } else {
                    li.appendChild(POST);
                }
            })(li.querySelector("ul"));
        });
    }
}