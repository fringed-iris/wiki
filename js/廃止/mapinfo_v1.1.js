/**
 * マップ情報の表を挿入
 * @param {String} origin 挿入先の兄弟要素のID
 * @param {Object} $ 生成データ
 */
const createMapInfoTable = (origin, $ = {}) => {
    /**
     * 全体のスタイル
     */
    const STYLE = {
        table: {
            fontSize: "16px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
        },
        mapTd: {
            height: "35px",
            width: "35px",
            fontWeight: "bold",
            backgroundColor: "#4f3422",
            padding: "3px",
        },
        titleTd: {
            backgroundColor: "#69462e",
            fontWeight: "bold",
            width: "280px"
        }
    }
    const ORIGIN = document.getElementById(origin);

    /**
     * 各種プロパティを付与して任意のHTML要素を生成
     * @param {String} type 
     * @param {Object} property 
     * @param {Object} style 
     * @returns {HTMLElement}
     */
    const createElementInstantly = (type, property = {}, style = {}) => {
        const ELEMENT = document.createElement(type);
        Object.assign(ELEMENT, property);
        Object.assign(ELEMENT.style, style);

        return ELEMENT;
    }

    ((cells = cells > 6 ? cells : 6) => {
        /**
         * マップ画像部分のtdを生成
         * @param {String} cellId 
         * @param {Boolean} image 
         * @returns {HTMLDListElement}
         */
        const createCell = (cellId, image = false) => {
            const TD = createElementInstantly("td", {}, STYLE.mapTd);

            const PORTAL_ID = $.portal[cellId];
            if (PORTAL_ID !== undefined) {//マップIDとリンク
                const A_ID = createElementInstantly(
                    "a",
                    {
                        href: `./map${PORTAL_ID}`,
                        textContent: PORTAL_ID
                    },
                    {}
                );

                TD.appendChild(A_ID);
            }

            if (image) {//マップ画像
                const IMG = createElementInstantly(
                    "img",
                    {
                        src: `/image/map${$.id}`
                    },
                    {
                        width: "100%",
                        aspectRatio: 1 / 1,
                    }
                );
                Object.assign(TD, {
                    colSpan: cells - 2,
                    rowSpan: cells - 2,
                });

                TD.appendChild(IMG);
            }

            return TD;
        }
        /**
         * 基本情報部分の見出しtdを生成
         * @param {String} title 
         * @returns {HTMLDListElement}
         */
        const createTitle = title => {
            const TD = createElementInstantly(
                "td",
                {
                    textContent: title
                },
                STYLE.titleTd
            );

            return TD;
        }

        const TABLE = createElementInstantly("table", {}, STYLE.table);
        const TBODY = document.createElement("tbody");
        const ROW_SPAN = [...Array(3)].map((_, i) =>
            Math.floor((cells - 3) / 3) + Number(i + 1 <= (cells - 3) - Math.floor((cells - 3) / 3) * 3)
        );

        for (let v = 0; v < cells; v++) {
            const TR = document.createElement("tr");

            if (v === 0 || v === cells - 1) {//マップ画像部分
                for (let h = 0; h < cells; h++) {
                    const DIR = v === 0
                        ? "n"
                        : "s";
                    const CELL_ID = !(h === 0 || h === cells - 1)
                        ? DIR + h
                        : false;

                    TR.appendChild(createCell(CELL_ID));
                }
            } else {//マップ画像部分
                const ROOP = 2 + Number(v === 1);
                for (let h = 0; h < ROOP; h++) {
                    const DIR = h === 0
                        ? "w"
                        : "e";
                    const CELL_ID = h === 0 || h === ROOP - 1
                        ? DIR + v
                        : false;

                    TR.appendChild(createCell(CELL_ID, v === 1 && h === 1));
                }
            }
            switch (v) {//基本情報部分
                case 0: { //エリア見出し
                    TR.appendChild(createTitle("エリア"));
                }
                    break;

                case 1: { //エリア
                    const TD = createElementInstantly(
                        "td",
                        {
                            rowSpan: ROW_SPAN[0]
                        },
                        {
                            backgroundColor: $.bg,
                            color: $.text
                        }
                    );
                    const A = createElementInstantly(
                        "a",
                        {
                            href: `./${$.area}`,
                            textContent: $.area
                        },
                        {}
                    );

                    TD.appendChild(A);
                    TR.appendChild(TD);
                }
                    break;

                case ROW_SPAN[0] + 1: {//バイオーム見出し
                    TR.appendChild(createTitle("バイオーム"));
                }
                    break;

                case ROW_SPAN[0] + 2: {//バイオーム
                    const TD = createElementInstantly(
                        "td",
                        {
                            textContent: $.biome,
                            rowSpan: ROW_SPAN[1]
                        },
                        {}
                    );

                    TR.appendChild(TD);
                }
                    break;

                case ROW_SPAN[0] + 2 + ROW_SPAN[1]: {//ID見出し
                    TR.appendChild(createTitle("マップID"));
                }
                    break;

                case ROW_SPAN[0] + 2 + ROW_SPAN[1] + 1: {//ID
                    const TD = createElementInstantly(
                        "td",
                        {
                            textContent: $.id,
                            rowSpan: ROW_SPAN[2]
                        },
                        {}
                    );

                    TR.appendChild(TD);
                }
                    break;

                default: break;
            }

            TBODY.appendChild(TR);
        }
        if ($.ultra) {//Ultra高確率
            const TR = document.createElement("tr");
            const TD = createElementInstantly("td",
                {
                    textContent: "Ultra高確率",
                    colSpan: cells + 1
                },
                {
                    backgroundColor: "#ff2b75",
                    fontWeight: "bold",
                }
            );

            TR.appendChild(TD);
            TBODY.appendChild(TR);
        }
        TABLE.appendChild(TBODY);
        ORIGIN.after(TABLE);
    })(7);  //縦横のマス数（6以上）
}