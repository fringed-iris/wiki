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
        /^\s*(?<comment>.+) --- (?<poster>.*) \((?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2}) (?<h>\d{2}):(?<m>\d{2}):(?<s>\d{2})\)\s*$/
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
                        const SPAN = createSpanWithClass('comment_poster');
                        SPAN.textContent = DATA.poster === '' ? '名無し' : DATA.poster;
                        if (DATA.poster === '') SPAN.style.color = "var(--c-text_black)";
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
    {//ソート
        /**
         * コメントを配列形式にして返す。再帰関数。
         * 形式は
         * [
         *  [<element>],
         *  [
         *   <element>,
         *   [
         *    <element>...
         *   ]
         *  ],
         *  ...
         * ]
         * のような<返信のネスト数 + 1>次配列（fc2のコメントシステムにより最大3+1）
         */
        const getAllComments = (
            li,
            d = {
                data: [],
                nest: []
            }
        ) => {
            for (let i = 0; i < li.length; i++) {
                const E = li[i];

                let E_span = [E.querySelector("span")];

                const E_UL = E.querySelector("ul");
                if (E_UL) {//返信がネストしてるなら
                    let n = [i];

                    const D = getAllComments(//再帰で掘る
                        E_UL.querySelectorAll("li"),
                        {
                            data: E_span,
                            nest: n
                        }
                    );

                    E_span = D.data;
                    n = D.nest;

                    d.nest.push(n);
                }

                d.data.push(E_span);
            }

            return d;
        }
        const sortComments = (arr = [], sortFn = new Function()) => {
            arr.forEach(e => {
                if (e.length > 1) {
                    sortComments(e[1], sortFn);
                }
            });
            arr.sort(sortFn);
        }

        const COMMENTS = getAllComments(document.querySelectorAll('ul.user_comment_list li'));

        sortComments(COMMENTS, (a, b) => {
            const _ = p => `${p[PROPERTY].year}${p[PROPERTY].month}${p[PROPERTY].day}${p[PROPERTY].h}${p[PROPERTY].m}${p[PROPERTY].s}`

            console.log(a, b);

            return _(a) > _(b)
                ? 1
                : -1;
        });

        console.log(COMMENTS);
    }
}