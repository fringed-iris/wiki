/* ----------
mobcode 

ver.1.5
---------- */


"use strict";

/**
 * 
 * @param {String} $.originId 挿入先の兄弟要素のID 
 * @param {Object} $.options 生成データ
 */
export const main = ($) => {
    /**
     * 全体のスタイル
     */
    const STYLE = {
        table: {
            margin: "auto",
        },
        tbody: {
            fontSize: "16px",
            textAlign: "center",
        },
        darkBg: {
            backgroundColor: "#4f3422",
        },
        rightSide: {
            width: "280px",
        },
        aliasSubtitle: {
            backgroundColor: "#69462e",
            textAlign: "center",
            fontWeight: "bold",
        },
        captionImg: {
            width: "200px",
            height: "200px"
        },
        differenceImg: {
            width: "80px",
            height: "80px"
        }
    }

    /**
     * 各種プロパティを付与して任意のHTML要素を生成
     * @param {String} type 
     * @param {Object} property 
     * @param {Object} style 
     * @returns {HTMLElement}
     */
    const createElmInstantly = (type, property = {}, style = {}) => {
        const ELEMENT = document.createElement(type);
        Object.assign(ELEMENT, property);
        Object.assign(ELEMENT.style, style);

        return ELEMENT;
    }
    /**
     * Br要素を生成
     * @returns {HTMLBRElement}
     */
    const createBr = () => {
        const BR = document.createElement("br");

        return BR;
    }
    /**
     * 各種プロパティを付与して見出し画像を含むTD要素を生成
     * @param {Object} tdProperty 
     * @returns {HTMLTableCellElement}
     */
    const createCaptionImg = tdProperty => {
        const TD = createElmInstantly(
            "td",
            tdProperty,
            STYLE.darkBg
        );
        const IMG = createElmInstantly(
            "img",
            {
                src: `/image/${$.options.leastRarity}_${$.options.name}`
            },
            STYLE.captionImg
        );

        TD.appendChild(IMG);

        return TD;
    }
    /**
     * 各種プロパティを付与してコメントのTD要素を生成
     * @param {Object} tdProperty 
     * @returns {HTMLTableCellElement}
     */
    const createComment = tdProperty => {
        const TD = createElmInstantly(
            "td",
            tdProperty,
            STYLE.darkBg
        );
        Object.assign(TD.style, STYLE.rightSide);

        return TD;
    }
    /**
     * 各種プロパティを付与して差分画像のTD要素を生成
     * @param {Object} img 
     * @param {Object} tdProperty 
     * @returns {HTMLTableCellElement}
     */
    const createDifferenceImg = (img, tdProperty) => {
        const TD = createElmInstantly(
            "td",
            tdProperty,
            STYLE.darkBg
        );

        if (img.create) {
            const IMG = createElmInstantly(
                "img",
                {
                    src: img.src
                },
                STYLE.differenceImg
            );

            TD.appendChild(IMG);
        }

        return TD;
    }
    /**
     * 通称の欄を生成
     * @returns {HTMLTableCellElement}
     */
    const createAliasSubtitle = () => {
        const TD = createElmInstantly(
            "td",
            {
                textContent: "通称"
            },
            STYLE.aliasSubtitle
        );

        return TD;
    }
    /**
     * 差分画像のレアリティ表示のTD要素を生成
     * @param {Object} spanData 
     * @returns {HTMLTableCellElement}
     */
    const createDifferenceImgRarity = spanData => {
        const TD = createElmInstantly(
            "td",
            {},
            STYLE.darkBg
        );

        if (spanData.create) {
            {
                const SPAN = createElmInstantly(
                    "span",
                    {
                        textContent: spanData.rarity
                    },
                    {
                        color: spanData.color
                    }
                );

                TD.appendChild(SPAN);
            }
            if (spanData.dif > 1) {
                const SPAN = createElmInstantly(
                    "span",
                    {
                        textContent: " ~"
                    },
                    {}
                );

                TD.appendChild(SPAN);
            }
        }

        return TD;
    }

    const TABLE = createElmInstantly(
        "table",
        {},
        STYLE.table
    );
    TABLE.classList.add("table");
    const TBODY = createElmInstantly(
        "tbody",
        {},
        STYLE.tbody
    );
    const ANY = {
        alias: typeof $.options?.alias == "string",
        differenceImg: typeof $.options?.differenceImg === "object",
    }
    const MAX_COL = 4;

    if (ANY.differenceImg) {//differenceImgの処理        
        let sortedId = [];
        for (let i = 0; i < $.options.differenceImg.length; i++) {
            const E = $.options.differenceImg[i];
            if (window.florr.rarity.id[E] > window.florr.rarity.id[$.options.leastRarity]) sortedId.push([window.florr.rarity.id[E], E])
        }
        sortedId.sort();

        $.options.differenceImg = [];
        for (let i = 0; i < sortedId.length; i++) $.options.differenceImg.push(sortedId[i][1])
    }
    {
        const TR = document.createElement("tr");

        {//見出し画像
            if (ANY.differenceImg) {
                const TD = createCaptionImg({
                    colSpan: $.options.differenceImg.length > MAX_COL
                        ? MAX_COL
                        : $.options.differenceImg.length
                });

                TR.appendChild(TD);
            } else {
                const TD = createCaptionImg({
                    rowSpan: ANY.alias ? 3 : 1
                });

                {
                    const CHILD_TD = createDifferenceImgRarity({
                        create: true,
                        rarity: window.florr.rarity.name[$.options.leastRarity],
                        dif: window.florr.rarity.length - window.florr.rarity.id[$.options.leastRarity],
                        color: window.florr.rarity.color.background[$.options.leastRarity],
                    });
                    CHILD_TD.style.display = "block";

                    TD.appendChild(CHILD_TD);
                }

                TR.appendChild(TD);
            }
        }
        {//ひとことコメント
            if (ANY.differenceImg) {
                const TD = createComment({
                    rowSpan: 1 + (
                        1 + Math.ceil($.options.differenceImg.length / MAX_COL) * 2 - 2
                        + (ANY.alias ? -1 : 1)),

                    textContent: $.options.comment,
                });

                TR.appendChild(TD);
            } else if (ANY.alias) {
                const TD = createComment({
                    rowSpan: 1,
                });

                {
                    const SPAN = document.createElement("span");
                    SPAN.textContent = $.options.comment;

                    {//改行
                        TD.appendChild(createBr());
                        TD.appendChild(createBr());
                    }

                    TD.appendChild(SPAN);

                    {//改行
                        TD.appendChild(createBr());
                        TD.appendChild(createBr());
                        TD.appendChild(createBr());
                    }
                }

                TR.appendChild(TD);
            } else {
                const TD = createComment({
                    rowSpan: 2,
                    textContent: $.options.comment,
                });

                TR.appendChild(TD);
            }
        }

        TBODY.appendChild(TR);
    }
    if (ANY.differenceImg) {
        let column = 0;
        for (column; column < Math.ceil($.options.differenceImg.length / MAX_COL); column++) {
            const FROM = column * MAX_COL;
            const TO = $.options.differenceImg.length > MAX_COL
                ? (column + 1) * MAX_COL
                : $.options.differenceImg.length;
            const DATA_END = TO > $.options.differenceImg.length
                ? $.options.differenceImg.length
                : TO;

            {
                const TR = document.createElement("tr");

                for (let i = FROM; i < TO; i++) {//差分画像
                    const TD = createDifferenceImg(
                        {
                            create: i < $.options.differenceImg.length,
                            src: `/image/${$.options.differenceImg[i]}_${$.options.name}`
                        },
                        {
                            rowSpan: ANY.alias && DATA_END === $.options.differenceImg.length
                                ? 2
                                : 1,
                        }
                    );

                    TR.appendChild(TD);
                }
                if (ANY.alias && DATA_END === $.options.differenceImg.length) {//通称（見出し）
                    const TD = createAliasSubtitle();

                    TR.appendChild(TD);
                }

                TBODY.appendChild(TR);
            }
            if (ANY.alias && DATA_END === $.options.differenceImg.length) {//通称
                const TR = document.createElement("tr");

                {
                    const TD = createElmInstantly(
                        "td",
                        {
                            rowSpan: 2,
                            textContent: $.options.alias,
                        },
                        {}
                    );

                    TR.appendChild(TD);
                }

                TBODY.appendChild(TR);
            }
            {//差分画像のレアリティ
                const TR = document.createElement("tr");

                for (let i = FROM; i < TO; i++) {
                    const DIF = window.florr.rarity.id[$.options.differenceImg[i + 1]] ?? (window.florr.rarity.length - 1) - window.florr.rarity.id[$.options.differenceImg[i]];
                    const TD = createDifferenceImgRarity(
                        {
                            create: DATA_END > i,
                            rarity: window.florr.rarity.name[$.options.differenceImg[i]],
                            dif: DIF,
                            color: window.florr.rarity.color.background[$.options.differenceImg[i]]
                        }
                    );

                    TR.appendChild(TD);
                }

                TBODY.appendChild(TR);
            }
        }
    } else {
        if (ANY.alias) {//通称（見出し）
            const TR = document.createElement("tr");
            {
                const TD = createAliasSubtitle();

                TR.appendChild(TD);
            }

            TBODY.appendChild(TR);
        }
        {//通称
            const TR = document.createElement("tr");
            if (ANY.alias) {
                const TD = document.createElement("td");

                {
                    const SPAN = document.createElement("span");
                    SPAN.textContent = $.options.alias;

                    {//改行
                        TD.appendChild(createBr());
                    }

                    TD.appendChild(SPAN);

                    {//改行
                        TD.appendChild(createBr());
                        TD.appendChild(createBr());
                    }
                }

                TR.appendChild(TD);
            }

            TBODY.appendChild(TR);
        }
    }

    TABLE.appendChild(TBODY);
    document.getElementById($.originId).after(TABLE);
}