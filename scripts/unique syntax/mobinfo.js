/* ----------
mobinfo 

ver.2.2
---------- */


"use strict";

/**
 * 
 * @param {String} $.originId 挿入先の兄弟要素のID 
 * @param {Object} $.data 生成データ
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
        },
        superMessage: {
            backgroundColor: window.florr.rarity.color.background["Sp"],
            color: window.florr.rarity.color.text["Sp"]
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
                src: `/image/${$.data.leastRarity}_${$.data.name.replace(/\s/g, "")}_Mob`
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
        alias: typeof $.data?.alias == "string",
        differenceImg: typeof $.data?.differenceImg === "object",
    }
    const MAX_COL = 4;

    if (ANY.differenceImg) {//differenceImgの処理        
        let sortedId = [];
        for (let i = 0; i < $.data.differenceImg.length; i++) {
            const E = $.data.differenceImg[i];
            if (window.florr.rarity.id[E] > window.florr.rarity.id[$.data.leastRarity]) sortedId.push([window.florr.rarity.id[E], E])
        }
        sortedId.sort();

        $.data.differenceImg = [];
        for (let i = 0; i < sortedId.length; i++) $.data.differenceImg.push(sortedId[i][1])
    }
    {
        const TR = document.createElement("tr");

        {//見出し画像
            if (ANY.differenceImg) {
                const TD = createCaptionImg({
                    colSpan: $.data.differenceImg.length > MAX_COL
                        ? MAX_COL
                        : $.data.differenceImg.length
                });

                TR.appendChild(TD);
            } else {
                const TD = createCaptionImg({
                    rowSpan: ANY.alias ? 3 : 1
                });

                {
                    const CHILD_TD = createDifferenceImgRarity({
                        create: true,
                        rarity: window.florr.rarity.name[$.data.leastRarity],
                        dif: window.florr.rarity.length - window.florr.rarity.id[$.data.leastRarity],
                        color: window.florr.rarity.color.background[$.data.leastRarity],
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
                        1 + Math.ceil($.data.differenceImg.length / MAX_COL) * 2 - 2
                        + (ANY.alias ? -1 : 1)),

                    textContent: $.data.comment,
                });

                TR.appendChild(TD);
            } else if (ANY.alias) {
                const TD = createComment({
                    rowSpan: 1,
                });

                {
                    const SPAN = document.createElement("span");
                    SPAN.textContent = $.data.comment;

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
                    textContent: $.data.comment,
                });

                TR.appendChild(TD);
            }
        }

        TBODY.appendChild(TR);
    }
    if (ANY.differenceImg) {
        let column = 0;
        for (column; column < Math.ceil($.data.differenceImg.length / MAX_COL); column++) {
            const FROM = column * MAX_COL;
            const TO = $.data.differenceImg.length > MAX_COL
                ? (column + 1) * MAX_COL
                : $.data.differenceImg.length;
            const DATA_END = TO > $.data.differenceImg.length
                ? $.data.differenceImg.length
                : TO;

            {
                const TR = document.createElement("tr");

                for (let i = FROM; i < TO; i++) {//差分画像
                    const TD = createDifferenceImg(
                        {
                            create: i < $.data.differenceImg.length,
                            src: `/image/${$.data.differenceImg[i]}_${$.data.name.replace(/\s/g, "")}_Mob`
                        },
                        {
                            rowSpan: ANY.alias && DATA_END === $.data.differenceImg.length
                                ? 2
                                : 1,
                        }
                    );

                    TR.appendChild(TD);
                }
                if (ANY.alias && DATA_END === $.data.differenceImg.length) {//通称（見出し）
                    const TD = createAliasSubtitle();

                    TR.appendChild(TD);
                }

                TBODY.appendChild(TR);
            }
            if (ANY.alias && DATA_END === $.data.differenceImg.length) {//通称
                const TR = document.createElement("tr");

                {
                    const TD = createElmInstantly(
                        "td",
                        {
                            rowSpan: 2,
                            textContent: $.data.alias,
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
                    const DIF = window.florr.rarity.id[$.data.differenceImg[i + 1]] ?? (window.florr.rarity.length - 1) - window.florr.rarity.id[$.data.differenceImg[i]];
                    const TD = createDifferenceImgRarity(
                        {
                            create: DATA_END > i,
                            rarity: window.florr.rarity.name[$.data.differenceImg[i]],
                            dif: DIF,
                            color: window.florr.rarity.color.background[$.data.differenceImg[i]]
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
                    SPAN.textContent = $.data.alias;

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
    if (!($.data.super === false)) {//Superメッセージ
        {//Superタイトル
            const TH = createElmInstantly(
                "th",
                {
                    textContent: "Super出現メッセージ",
                    colSpan: MAX_COL + 1
                },
                {}
            );

            TBODY.appendChild(TH);
        }
        {//Superメッセージ
            const TR = document.createElement("tr");
            const TD = createElmInstantly(
                "td",
                {
                    colSpan: MAX_COL + 1
                },
                STYLE.superMessage
            );

            {//Superメッセージ
                const SPAN = createElmInstantly(
                    "span",
                    {
                        textContent: $.data.superMessage === undefined
                            ? `A Super ${$.data.name} has spawned somewhere!`
                            : $.data.superMessage
                    },
                    {}
                );

                TD.appendChild(SPAN);
            }
            {//改行
                const BR = document.createElement("br");

                TD.appendChild(BR);
            }
            {//Superメッセージ和訳（任意）
                const SPAN = createElmInstantly(
                    "span",
                    {
                        textContent: $.data.superMessage === null || $.data.superMessage === undefined
                            ? `（Super ${$.data.name}がどこかで出現中！）`
                            : `（${$.data.JAsuperMessage}）`
                    },
                    {}
                );

                TD.appendChild(SPAN);
            }

            TR.appendChild(TD);
            TBODY.appendChild(TR);
        }
    }

    TABLE.appendChild(TBODY);
    document.getElementById($.originId).after(TABLE);
}