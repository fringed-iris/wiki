/* ----------
statustable & petalcode & mobcode
ver 4.3
---------- */


"use strict";

const DEFAULT_TOFIXED_NUM = 1;

export const Talents = class {

    constructor(reload, medic, duplicator, poison, CPoison) {
        this.reload = reload;
        this.medic = medic;
        this.duplicator = duplicator;
        this.poison = poison;
        this.CPoison = CPoison;
    }
}

export const TALENTS_VAL = new Talents(//各タレントの効果（累積）
    [-0.08, -0.16, -0.23, -0.29, -0.35, -0.41, -0.45, -0.50],
    [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80],
    [0, 0, 1],
    [0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5],
    [0, 0, 0, 0, 0, 0, -0.167777],

    //summoner: [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80]
);

//TALENTS_FACTORのデフォ値。これ＋TALENTS_VALがTALENTS_FACTORの値になる
export const TALENTS_FACTOR_DEFAULT = new Talents(1, 1, 0, 1, 1);


const calcAbility = baseAbility => {
    const LIST = new Array(window.florr.rarity.length);

    for (let id = 0; id < window.florr.rarity.length; id++) {
        const FACTOR = 3 ** id;
        const AMOUNT = baseAbility * FACTOR;
        LIST[id] = AMOUNT;
    }
    return LIST;
}

const calcHeal = baseAbility => {
    const TABLE = new Array(window.florr.rarity.length);

    for (let id = 0; id <= (window.florr.rarity.length - 1); id++) {
        let factor = 3 ** id;
        switch (id) {
            case 6:
                factor = factor / 3 * 1.73;
                break;
            case 7:
                factor = factor / 3;
                break;

            default: break;
        }

        const AMOUNT = (baseAbility * factor);
        TABLE[id] = AMOUNT;
    }

    return TABLE;
}

const calcDefaultMobArmor = baseAbility => {
    const TABLE = new Array(window.florr.rarity.length);

    for (let id = 0; id <= (window.florr.rarity.length - 1); id++) {
        let factor = 3 ** id;
        switch (id) {
            case 7:
                factor = factor / 3;
                break;

            default: break;
        }

        const AMOUNT = (baseAbility * factor);
        TABLE[id] = AMOUNT;
    }

    return TABLE;
}

const calcMobHealth = baseAbility => {

    const TABLE = new Array(window.florr.rarity.length);

    for (let id = 0; id <= (window.florr.rarity.length - 1); id++) {
        let factor = window.florr.database.mobHealthFactor[id];

        const AMOUNT = (baseAbility * factor);
        TABLE[id] = AMOUNT;
    }

    return TABLE;
}

const calcDPS = options => {
    let damageAmount =
        Math.ceil(options.petal.health / options.mob.damage)   //モブに衝突可能な最大回数
        * (options.petal.damage)    //×ペタルの攻撃力
        + (options.petal.poisonDamage   //+毒
            ? options.petal.poisonDamage
            : 0);

    return damageAmount / options.petal.reloadTime;
}
const calcDPSRange = (options, rarity) => {
    const Hornet = {
        "health": 62.5 * window.florr.database.mobHealthFactor[0],
        "damage": calcAbility(50)[rarity]
    };

    const BabyAnt = {
        "health": 25 * window.florr.database.mobHealthFactor[0],
        "damage": calcAbility(10)[rarity]
    };

    return {
        "max": calcDPS({
            "petal": options,
            "mob": BabyAnt
        }),
        "min": calcDPS({
            "petal": options,
            "mob": Hornet
        })
    };
}






const setRarityCellStyleAndText = (cell, rID) => {
    Object.assign(cell.style, {
        textAlign: "center",
        backgroundColor: window.florr.rarity.color.background[window.florr.rarity.id[rID]],
        color: window.florr.rarity.color.text[window.florr.rarity.id[rID]],
        height: "30px",
    })
    cell.innerText = window.florr.rarity.name[window.florr.rarity.id[rID]];
}

/**
 * １つの縦のステータスについてのクラス。
 * FieldTableとTALENTS（TALENTS_FACTORの形）に依存。
 * @param {object} options フィールドに必要なパラメーター。
 */
const Field = class {

    constructor(options) {
        this.type = options.type ?? "normal"; //計算方式
        this.base = options.base ?? 0;
        this.increase = options.increase ?? 0;
        this.uniqueDatas = options.uniqueDatas; //ユニーク全般
        this.baseField; //依存フィールド１
        this.secondBaseField; //依存フィールド２
        this.baseFieldId = options.baseFieldId;
        this.secondBaseFieldId = options.secondBaseFieldId;
        this.valueArr = []; //長さ8のnumber

        this.relatedTalent = options.relatedTalent ?? "";
        this.talentsFactor;
        this.getTalentsFactor;
        this.fieldTable;
        //外からこれらのプロパティを直接参照しないこと！！！
    }

    /**
     * パラメータを更新する。
     * 入力されたパラメータに基づいて計算する。
     */
    update() {
        //更新
        this.talentsFactor = this.getTalentsFactor();
        this.baseField = this.fieldTable.getFieldFromId(this.baseFieldId);
        this.secondBaseField = this.fieldTable.getFieldFromId(this.secondBaseFieldId);
        //計算
        this.valueArr = this.calc();
    }

    getBaseFieldIdArr() {
        const returnArr = [];
        if (this.baseFieldId) returnArr.push(this.baseFieldId);
        if (this.secondBaseFieldId) returnArr.push(this.secondBaseFieldId);
        return returnArr;
    }

    /**現在のパラメーターからこのフィールドのステータスを算出する。
     * @returns {number[]} 長さ8のステータスのnumberの配列。
    */
    calc() {
        let calced = (() => {
            let base;
            if (this.type == "unique") return this.uniqueDatas;

            function correctToNum(num) { return (typeof num == "number") ? num : 0; } //Correct To Number

            return (() => { //何があろうとNumber型を返す
                try {
                    switch (this.type) {
                        case "normal":
                            return calcAbility(correctToNum(this.base));
                        case "heal":
                            return calcHeal(correctToNum(this.base));
                        case "Mhealth":
                            return calcMobHealth(correctToNum(this.base));
                        case "Marmor":
                            return calcDefaultMobArmor(correctToNum(this.base));
                        case "constant":
                            let arr = [];
                            for (let i = 0; i < window.florr.rarity.length; i++) {
                                arr.push(correctToNum(this.base + i * this.increase));
                            }
                            return arr;
                        case "FplusF":
                            base = this.baseField.getValueArr();
                            return this.secondBaseField.getValueArr().map((e, i) => { return base[i] + e });
                        case "FminusF":
                            base = this.baseField.getValueArr();
                            return this.secondBaseField.getValueArr().map((e, i) => { return base[i] - e });
                        case "FtimesF":
                            base = this.baseField.getValueArr();
                            return this.secondBaseField.getValueArr().map((e, i) => { return base[i] * e });
                        case "FoverF":
                            base = this.baseField.getValueArr();
                            return this.secondBaseField.getValueArr().map((e, i) => { return (base[i] / e) ?? 0 });
                        case "FplusB":
                            return this.baseField.getValueArr().map(e => { return e + this.base; });
                        case "FtimesB":
                            return this.baseField.getValueArr().map(e => { return e * this.base; });
                        case "FFmax":
                            return this.baseField.getValueArr().map(e => { return Math.max(e, base[i]) });
                        case "FFmin":
                            return this.baseField.getValueArr().map(e => { return Math.min(e, base[i]) });
                        default:
                            return [0, 0, 0, 0, 0, 0, 0, 0];
                    }
                } catch {
                    return [0, 0, 0, 0, 0, 0, 0, 0];
                }
            })().map(correctToNum);
        })();

        //タレント処理
        let returnArr = [];
        for (let rID = 0; rID < calced.length; rID++) {
            let value;
            switch (this.relatedTalent) {
                case "reload":
                case "medic":
                case "poison":
                case "CPoison":
                    value = calced[rID] * this.talentsFactor[this.relatedTalent];
                    break;
                case "duplicator":
                    if (calced[rID] >= 2) {
                        value = calced[rID] + this.talentsFactor.duplicator;
                    } else {
                        value = calced[rID];
                    }
                    break;
                default:
                    value = calced[rID];
            }
            returnArr.push(value);
        }
        return returnArr;
    }

    getValueArr() {
        return this.valueArr;
    }

    setFuncToGetTalentsFactor(func) {
        this.getTalentsFactor = func;
    }

    setFieldTable(fieldTable) {
        this.fieldTable = fieldTable;
    }
}

//Fieldを格納する。Managerではないので必要以上の処理は載せず、forEachFieldを使うこと。
const FieldTable = class {

    #fieldDict = {};
    #updateId = 0;
    #fieldUpdateIdDict = {};
    #updateNestCounter = 0;

    addNewField(fieldId, field) {
        this.#fieldDict[fieldId] = field;
        this.#fieldUpdateIdDict[fieldId] = 0;

        //set up field
        field.setFieldTable(this);
    }

    setFieldDict(fieldDict) {
        this.#fieldDict = {};
        Object.assign(this.#fieldDict, fieldDict);
        this.#fieldUpdateIdDict = {};
        for (const id in fieldDict) { this.#fieldUpdateIdDict[id] = 0 };
    }

    updateEveryField() {

        this.#updateId++;
        this.#updateNestCounter = 0;
        for (const id in this.#fieldDict) {
            this.#updateOneField(this.#fieldDict[id], id);
        }
    }

    #updateOneField(field, id) {
        this.#updateNestCounter++;
        if (this.#updateNestCounter >= 100) return;

        const baseFieldIdArr = field.getBaseFieldIdArr();
        baseFieldIdArr.forEach(baseFieldId => {
            const baseField = this.#fieldDict[baseFieldId];
            if (this.#fieldUpdateIdDict[baseFieldId] !== this.#updateId) {
                this.#updateOneField(baseField, baseFieldId);
            }
        })

        if (this.#fieldUpdateIdDict[id] !== this.#updateId) {
            field.update();
            this.#fieldUpdateIdDict[id] = this.#updateId;
        }

        this.#updateNestCounter--;
    }

    forEachField(func) {
        for (const id in this.#fieldDict) {
            func(this.#fieldDict[id], id);
        }
    }

    getFieldFromId(id) {
        return this.#fieldDict[id];
    }
}

/**
 * テーブルの縦列のクラス。FieldとFieldTableに依存。
 * @param {*} options パラメーター。
 */
const Column = class {

    constructor(options) {
        this.fieldId = options.fieldId; //Fieldに依存
        this.secondFieldId = options.secondFieldId ?? undefined;
        this.toFixed = options.toFixed ?? DEFAULT_TOFIXED_NUM;
        this.first = options.first ?? "";
        this.last = options.last ?? "";
        this.viewType = options.viewType ?? "normal";
        this.name = options.name ?? ""; //見出しに表示されるテキスト
        this.width = options.width ?? 85; //cellの幅(px)。numberで指定

        this.cellArr = [];
        this.headCell;
        this.fieldTable;
    }

    setFieldTable(fieldTable) {
        this.fieldTable = fieldTable;
    }

    setHeadCell(cell) {
        this.headCell = cell;
    }

    pushNewCell(cell) {
        this.cellArr.push(cell);
    }

    updateView() {

        const field = this.fieldTable.getFieldFromId(this.fieldId);
        const secondField = this.secondFieldId ? this.fieldTable.getFieldFromId(this.secondFieldId) : undefined;

        let fix = v => {
            let vFixed;
            switch (typeof v) {
                case "number":
                    vFixed = v.toFixed(this.toFixed);
                    break;
                case "string":
                    vFixed = v;
                    break;
                default:
                    vFixed = 0;
            }
            return this.first + vFixed + this.last;
        }

        for (let rID = -1; rID < this.cellArr.length; rID++) {
            let cell;

            if (rID == -1) {

                cell = this.headCell;

                if (this.viewType == "damage") cell.innerHTML = this.name + "<br>(単体での値)"
                else if (this.viewType == "poison") cell.innerHTML = this.name + "<br>(秒間値)"
                else cell.textContent = this.name;
                cell.style.fontWeight = "bold";

            } else {
                cell = this.cellArr[rID];

                let v1 = field.getValueArr()[rID];
                let v2 = secondField ? secondField.getValueArr()[rID] : undefined;

                if (this.viewType == "rarity") {
                    setRarityCellStyleAndText(cell, v1);
                    continue;
                }

                //textContent
                cell.textContent = fix(v1);

                if (this.viewType == "reload") {
                    if (v2 != 0) cell.textContent = cell.textContent + " + " + fix(v2);
                }

                if (this.viewType == "damage") {
                    if (v2 != v1) cell.innerHTML = cell.textContent + "<br>(" + fix(v2) + ")";
                }

                if (this.viewType == "poison") {
                    if (v2) cell.innerHTML = cell.textContent + "<br>(" + fix(v1 / v2) + "/s)";
                }
            }

            //style
            cell.style.width = this.width + "px";
            cell.style.textAlign = "center";
        }
    }
}




export const PulldownMenufyHost = class {
    constructor() {}

    DEFAULT_LABEL_NONE = {
        label: "なし",
        value: -1,
        color: "var(--c-text_black)",
        backgroundColor: "var(--c-gray_dark)",
    }

    DEFAULT_LABEL = [
        {
            label: "Common",
            value: 0,
            color: window.florr.rarity.color.text["Cm"],
            backgroundColor: window.florr.rarity.color.background["Cm"]
        },
        {
            label: "Unusual",
            value: 1,
            color: window.florr.rarity.color.text["Un"],
            backgroundColor: window.florr.rarity.color.background["Un"]
        },
        {
            label: "Rare",
            value: 2,
            color: window.florr.rarity.color.text["Re"],
            backgroundColor: window.florr.rarity.color.background["Re"]
        },
        {
            label: "Epic",
            value: 3,
            color: window.florr.rarity.color.text["Ep"],
            backgroundColor: window.florr.rarity.color.background["Ep"]
        },
        {
            label: "Legendary",
            value: 4,
            color: window.florr.rarity.color.text["Lg"],
            backgroundColor: window.florr.rarity.color.background["Lg"]
        },
        {
            label: "Mythic",
            value: 5,
            color: window.florr.rarity.color.text["My"],
            backgroundColor: window.florr.rarity.color.background["My"]
        },
        {
            label: "Ultra",
            value: 6,
            color: window.florr.rarity.color.text["Ul"],
            backgroundColor: window.florr.rarity.color.background["Ul"]
        },
        {
            label: "Super",
            value: 7,
            color: window.florr.rarity.color.text["Sp"],
            backgroundColor: window.florr.rarity.color.background["Sp"]
        }
    ]

    createPullDownMenu = (options = []) => {//プルダウンメニュー用の要素を作成
        const UL = document.createElement("ul");
        UL.classList.add("select");

        options.forEach(o => {
            const LI = document.createElement("li");
            LI.textContent = o.label;
            LI.dataset.value = o.value;//独自データ属性"value"を設定
            LI.style.color = o.color || "#fff";
            LI.style.backgroundColor = o.backgroundColor || "var(--c-subTheme_light)";

            UL.appendChild(LI);
        });

        return UL;
    }

    pulldownMenufy = (ul, callBack) => {//引数のUL要素をプルダウンメニュー化
        const DEFAULT_STYLE = {
            selectedOption: {
                position: "relative",
                margin: 0,
            },
            options: {
                position: "absolute",
            }
        }

        const select = (ul, active = false, origin = false) => {
            const updateAllStyle = (elm, style = false) => {
                for (let i = 1; i < elm.length; i++) Object.assign(elm[i].style, style);
            }
            const updateSelectedOption = selectedOption => {
                const SELECTED_OPTION = selectedOption.cloneNode(true);
                Object.assign(SELECTED_OPTION.style, DEFAULT_STYLE.selectedOption);
                SELECTED_OPTION.addEventListener("selectstart", e => e.preventDefault());

                let options = ul.querySelectorAll("li");
                options[0].remove();
                options = ul.querySelectorAll("li");
                options[0].before(SELECTED_OPTION);
            }

            const OPTIONS = ul.querySelectorAll("li");
            if (active) {
                Object.assign(OPTIONS[0].style, {
                    zIndex: 1,
                });
                updateAllStyle(OPTIONS, {
                    display: "",
                    zIndex: 1,
                });
            } else {
                if (origin !== false) updateSelectedOption(origin);
                Object.assign(OPTIONS[0].style, {
                    zIndex: 0,
                });
                updateAllStyle(OPTIONS, {
                    display: "none",
                    zIndex: 0,
                });
            }
        }

        ul.isExpanded = false;

        {
            const OPTIONS = ul.querySelectorAll("li");
            OPTIONS.forEach(li => Object.assign(li.style, DEFAULT_STYLE.options));

            const SELECTED_OPTION = document.createElement("li");
            OPTIONS[0].before(SELECTED_OPTION);
        }
        {
            const OPTIONS = ul.querySelectorAll("li");

            document.addEventListener("click", e => {
                if (e.target === ul.querySelectorAll("li")[0]) {
                    ul.isExpanded = !ul.isExpanded;
                } else {
                    ul.isExpanded = false;
                }
                select(ul, ul.isExpanded, false);
            });

            let marginTop = 0;
            for (let i = 1; i < OPTIONS.length; i++) {
                marginTop += OPTIONS[i - 1].offsetHeight;
                OPTIONS[i].style.marginTop = `${marginTop}px`;

                OPTIONS[i].addEventListener("click", e => {
                    if (ul.isExpanded) {
                        ul.isExpanded = false;
                        select(ul, ul.isExpanded, e.target);
                        callBack(e.target.dataset.value);//コールバック関数を実行
                    }
                });
                OPTIONS[i].addEventListener("selectstart", e => e.preventDefault());
            }

            select(ul, ul.isExpanded, OPTIONS[1]);
        }
    }
}

//fieldTableを生成する
//FieldとFieldTableに依存
const createFieldTable = function(fieldOptions, fieldTableOptions) {

    const TALENTS_FACTOR = fieldTableOptions.TALENTS_FACTOR;

    const fieldDict = {};
    for (const id in fieldOptions) {
        const option = fieldOptions[id];
        fieldDict[id] = new Field(option);
    }

    const fieldTable = new FieldTable();

    for (const id in fieldDict) {
        fieldTable.addNewField(id, fieldDict[id]);
    }
    fieldTable.forEachField(field => {
        field.setFuncToGetTalentsFactor(() => TALENTS_FACTOR);
    })

    return fieldTable;
}

//ステータステーブルを生成する
//createFieldTableを使用
//ColumnとfieldTableに依存
export const createStatusTable = function (fieldOptions, columnOptionsArr, statusTableOptions) {

    const columnArr = [];
    columnOptionsArr.forEach(opts => {
        if (!opts.isHidden) {
            columnArr.push(new Column(opts));
        }
    })

    const TALENTS_FACTOR = statusTableOptions.TALENTS_FACTOR;

    const leastRarity = statusTableOptions.leastRarity;

    const TABLE = document.createElement("table");

    const TBODY = document.createElement("tbody");

    //fieldTableを作成
    const fieldTable = createFieldTable(fieldOptions, { "TALENTS_FACTOR": TALENTS_FACTOR });

    //ColumnがfieldTableを参照する
    columnArr.forEach(column => column.setFieldTable(fieldTable));

    //アップデートをする
    TABLE.updateWhole = function () {
        fieldTable.updateEveryField();
        columnArr.forEach(c => { c.updateView() });
    }

    //cell生成、Columnに登録
    for (let rID = -1; rID < window.florr.rarity.length; rID++) {
        const TR = TBODY.insertRow();
        for (let j = 0; j < columnArr.length; j++) {
            if (rID === -1) {
                const TH = document.createElement("th");
                TR.appendChild(TH);
                columnArr[j].setHeadCell(TH); //見出しを生成
            } else {
                const TD = TR.insertCell();
                columnArr[j].pushNewCell(TD);
            }
        }
        if (rID != -1 && rID < leastRarity) TR.style.display = "none";
    }

    TABLE.updateWhole();

    TABLE.appendChild(TBODY);

    return TABLE;

}