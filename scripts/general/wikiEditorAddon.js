/** 文字列２つを選択範囲の周りに挿入した文字列を返す
 * @param {string} value 操作対象の文字列
 * @param {number} selectionStart 選択開始位置（範囲に含まれる）
 * @param {number} selectionEnd 選択終了位置（範囲に含まれない）
 * @param {string} strInsertBefore 選択範囲の直前に挿入する文字列
 * @param {string} strInsertAfter 選択範囲の直後に挿入する文字列
 * @return { string }
 */
const insertStringAroundSelection = function (value, selectionStart, selectionEnd, strInsertBefore, strInsertAfter) {
    const TEXT = {
        before: value.slice(0, selectionStart),
        selecting: value.slice(selectionStart, selectionEnd),
        after: value.slice(selectionEnd, value.length),
    }
    return TEXT.before + strInsertBefore + TEXT.selecting + strInsertAfter + TEXT.after;
}

export function main() {

    /** @typedef {{toolbar:HTMLElement, editingField:HTMLTextAreaElement}} Options */

    const newColor = (rabel, color) => { return { rabel, color } };

    const colors = [
        {
            rabel: "wikiテーマカラー",
            content: [
                newColor("wiki背景", window.florr.themeColor.theme),
                newColor("表の枠", window.florr.themeColor.subTheme_dark),
                newColor("表の背景", window.florr.themeColor.subTheme_light),
            ],
        },

        {
            rabel: "レアリティ",
            content: [
                newColor("Common", window.florr.rarity.color.background[window.florr.rarity.id[0]]),
                newColor("Unusual", window.florr.rarity.color.background[window.florr.rarity.id[1]]),
                newColor("Rare", window.florr.rarity.color.background[window.florr.rarity.id[2]]),
                newColor("Epic", window.florr.rarity.color.background[window.florr.rarity.id[3]]),
                newColor("Legendary", window.florr.rarity.color.background[window.florr.rarity.id[4]]),
                newColor("Mythic", window.florr.rarity.color.background[window.florr.rarity.id[5]]),
                newColor("Ultra", window.florr.rarity.color.background[window.florr.rarity.id[6]]),
                newColor("Super", window.florr.rarity.color.background[window.florr.rarity.id[7]]),
                newColor("Unique", window.florr.rarity.color.background[window.florr.rarity.id[8]]),
            ],
        },

        {
            rabel: "エリア",
            content: [
                newColor("Garden", "#1fa861"),
                newColor("Desert", "#ecdcb8"),
                newColor("Ocean", "#5785ba"),
                newColor("Jungle", "#009900"),
                //newColor("Fire Ant Hell", "#990000"),
                newColor("Ant Hell", "#996644"),
                newColor("Pyramid", "#CC9900"),
                newColor("Sewers", "#666633"),
                //newColor("PvP", "#4d5e56"),
                newColor("Hel", "#CC0000"),
                newColor("Factory", "#999999"),
                //newColor("Battle Royal", "#000000"),
            ],
        },
    ]

    const SCRIPTS = [
        {
            title: "petalcode",
            template:
                `
&spanclass(petalcode){
    name: "", //ペタル名
    petalCount: 1, //ペタル個数
    baseHealth: 10, //ペタルCm総体力
    baseDamage: 10, //ペタルCm総攻撃力
    reloadTime: 2.5, //再生時間
    secondReloadTime: 0.5, //第２再生時間
    leastRarity: 0, //最低レアリティ
    specialStatus: [
        {
            name: "", //特殊ステータス名
            type: "normal", //計算方式
            base: 1, //Cm値
            width: 80, //幅
        }
    ]
    //詳しくはpetalcode (スクリプト)を参照
}
`       }
    ]

    const createElement = {
        ribbon(options = {}) {
            const DIV = document.createElement("div");
            DIV.id = options.id;

            const TITLE = document.createElement("span");
            TITLE.classList.add(options.className);
            TITLE.textContent = options.title;

            DIV.appendChild(TITLE);

            return DIV;
        },
        section(options = {}) {
            const DIV = document.createElement("div");
            const TITLE = document.createElement("span");
            TITLE.classList.add(options.className);
            TITLE.textContent = options.title;

            DIV.appendChild(TITLE);

            return DIV;
        },
        colorPalette(options = {}) {
            const DIV_TOP = document.createElement("div");
            DIV_TOP.classList.add(options.className);

            const DIV_COLOR = document.createElement("div");
            DIV_COLOR.style.backgroundColor = options.color;
            DIV_COLOR.addEventListener("click", options.handler);

            const DIV_RABEL = document.createElement("span");
            DIV_RABEL.textContent = options.rabel;

            DIV_TOP.appendChild(DIV_COLOR);
            DIV_TOP.appendChild(DIV_RABEL);

            return DIV_TOP;
        },
        /** @param {{ className: string, handler: function, label: string }} options */
        insertButton(options) {
            const DIV_TOP = document.createElement("div");
            DIV_TOP.classList.add(options.className);

            const BUTTON = document.createElement("button");
            BUTTON.addEventListener("click", options.handler);
            BUTTON.textContent = options.label;

            DIV_TOP.appendChild(BUTTON);

            return DIV_TOP;
        },
    }

    /** textareaの選択範囲の前後に文字列を挿入する
     * @param { HTMLTextAreaElement } element
     * @param {string} strInsertBefore 選択範囲の直前に挿入する文字列
     * @param {string} strInsertAfter 選択範囲の直後に挿入する文字列
     * */
    const insertStringAroundTextAreaSelection = function (element, strInsertBefore, strInsertAfter) {
        const selectionStartMemo = element.selectionStart;
        element.value = insertStringAroundSelection(
            element.value,
            element.selectionStart,
            element.selectionEnd,
            strInsertBefore,
            strInsertAfter
        );
        element.selectionEnd = selectionStartMemo;
    }

    /** @param {Options} options */
    const createColorPaletteMain = (options = {}) => {
        const COLOR_PALETTE = createElement.ribbon({
            id: "colorPalette",
            className: "ribbon_title",
            title: "",
        });

        colors.forEach(category => {
            const COLOR_CONTENT = category.content;

            const SECTION = createElement.section({
                className: "colorPalette_title",
                title: category.rabel,
            });
            const INCLUDE_COLORS = document.createElement("div");
            INCLUDE_COLORS.classList.add("colorPalette_palette");

            COLOR_CONTENT.forEach(colorInfo => {
                const newColor = createElement.colorPalette({
                    color: colorInfo.color,
                    rabel: colorInfo.rabel,
                    className: "colorPalette_color",
                    handler: () => insertStringAroundTextAreaSelection(options.editingField, `&color(${colorInfo.color}){`, "}"),
                });

                INCLUDE_COLORS.appendChild(newColor);
            });

            SECTION.appendChild(INCLUDE_COLORS);
            COLOR_PALETTE.appendChild(SECTION);
        });

        options.toolbar.after(COLOR_PALETTE);
    }

    /** @param {Options} options */
    const createInsertScriptPanelMain = (options = {}) => {
        const PANEL = createElement.ribbon({
            id: "insertScriptPanel",
            className: "ribbon_title",
            title: "スクリプト",
        });

        SCRIPTS.forEach(script => {
            const handler = () => insertStringAroundTextAreaSelection(options.editingField, script.template, "");
            const BUTTON = createElement.insertButton({
                className: "insertScriptPanel_button",
                handler: handler,
                label: script.title,
            });
            PANEL.appendChild(BUTTON);
        });

        options.toolbar.after(PANEL);
    }

    /** @param {Options} options */
    const main = (options = {}) => {
        createColorPaletteMain(options);
        createInsertScriptPanelMain(options);
    }

    if (
        window.location.pathname.slice(1, 5) === "edit"
        || new URL(window.location).searchParams.get("cmd") === "edit"
    ) {
        main({
            toolbar: document.getElementById("toolbar"),
            editingField: document.getElementById("html"),
        });
    }
}