export function main() {
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
    }

    const main = (options = {}) => {
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
                    handler() {
                        const EDITING_FIELD = {
                            value: options.editingField.value,
                            start: options.editingField.selectionStart,
                            end: options.editingField.selectionEnd,
                        }
                        const TEXT = {
                            before: EDITING_FIELD.value.slice(
                                0,
                                EDITING_FIELD.start
                            ),
                            selecting: EDITING_FIELD.value.slice(
                                EDITING_FIELD.start,
                                EDITING_FIELD.end
                            ),
                            after: EDITING_FIELD.value.slice(
                                EDITING_FIELD.end,
                                EDITING_FIELD.value.length
                            ),
                        }

                        options.editingField.value = `${TEXT.before}&color(${colorInfo.color}){${TEXT.selecting}}${TEXT.after}`;
                        options.editingField.selectionStart, options.editingField.selectionEnd = EDITING_FIELD.start;
                    }
                });

                INCLUDE_COLORS.appendChild(newColor);
            });

            SECTION.appendChild(INCLUDE_COLORS);
            COLOR_PALETTE.appendChild(SECTION);
        });

        options.toolbar.after(COLOR_PALETTE);
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