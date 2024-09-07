/* ----------
petalcode 

ver.4.2
---------- */


"use strict";

const DEFAULT_TOFIXED_NUM = 1;

const Talents = class {

    constructor(reload, medic, duplicator, poison, CPoison) {
        this.reload = reload;
        this.medic = medic;
        this.duplicator = duplicator;
        this.poison = poison;
        this.CPoison = CPoison;
    }
}

const TALENTS_VAL = new Talents(//各タレントの効果（累積）
    [-0.08, -0.16, -0.23, -0.29, -0.35, -0.41, -0.45, -0.50],
    [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80],
    [0, 0, 1],
    [0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5],
    [0, 0, 0, 0, 0, 0, -0.167777],

    //summoner: [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80]
);

//TALENTS_FACTORのデフォ値。これ＋TALENTS_VALがTALENTS_FACTORの値になる
const TALENTS_FACTOR_DEFAULT = new Talents(1, 1, 0, 1, 1);

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
 * １つの縦のステータスについてのクラス。あとアップデートもする優秀なやつ。
 * TALENTS（TALENTS_FACTORの形）に依存。
 * @param {object} options フィールドに必要なパラメーター。
 */
const Field = class {

    constructor(options) {
        //     this.isHidden = options.isHidden ?? false; //表示／非表示
        this.type = options.type ?? "normal"; //計算方式
        this.base = options.base ?? 0;
        this.increase = options.increase ?? 0;
        this.uniqueDatas = options.uniqueDatas; //ユニーク全般
        this.baseField; //依存フィールド１
        this.secondBaseField; //依存フィールド２
        this.baseFieldId = options.baseFieldId;
        this.secondBaseFieldId = options.secondBaseFieldId;
        this.valueArr = []; //長さ8のnumber

        this.updateId = 0;
        this.branchFieldArr = [];

        this.relatedTalent = options.relatedTalent ?? "";
        this.talentsFactor;
        //外からこれらのプロパティを直接参照しないこと
    }

    isAlreadyUpdated(id) {
        return this.updateId == id;
    }

    /**
     * このフィールドに依存しているフィールドを突っ込むことで依存関係を構築し、update()の際に呼び出す。
     * @param {*} field このフィールドに依存しているフィールド
     */
    pushDependentField(field) {
        this.branchFieldArr.push(field);
    }

    /**
     * 入力されたパラメータに基づいて計算し、依存されているFieldにもupdate()を実行する。
     * 依存しているFieldが全て計算済みでなければ処理は行われない。
     * @param {*} updateId アップデートのID。同じアップデートについては１回のみ計算を行う。
     */
    update(updateId) {
        if (updateId === this.updateId) return;
        if (this.baseField && !this.baseField.isAlreadyUpdated(updateId)) return;
        if (this.secondBaseField && !this.secondBaseField.isAlreadyUpdated(updateId)) return;
        //計算
        this.valueArr = this.calc();

        this.updateId = updateId;

        //たぐって依存fieldを更新
        this.branchFieldArr.forEach(field => {
            field.update(updateId);
        })
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
                    return [0, 0, 0, 0, 0, 0, 0, 0];;
                }
            })().map(correctToNum);
        })();

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

    setTalentsFactor(talents) {
        this.talentsFactor = talents;
    }
}

/**
 * テーブルの縦列のクラス。Fieldに依存。
 * @param {*} options パラメーター。
 */
const Column = class {

    constructor(options) {
        this.fieldId = options.fieldId; //Fieldに依存
        this.field;
        this.secondFieldId = options.secondFieldId ?? undefined;
        this.secondField;
        this.toFixed = options.toFixed ?? DEFAULT_TOFIXED_NUM;
        this.first = options.first ?? "";
        this.last = options.last ?? "";
        this.viewType = options.viewType ?? "normal";
        this.name = options.name ?? ""; //見出しに表示されるテキスト
        this.width = options.width ?? 85; //cellの幅(px)。numberで指定

        this.cellArr = [];
        this.headCell;
    }

    setHeadCell(cell) {
        this.headCell = cell;
    }

    pushNewCell(cell) {
        this.cellArr.push(cell);
    }

    updateView() {
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
                else if (this.viewType == "poison") cell.innerHTML = this.name + "<br>(秒間毒)"
                else cell.textContent = this.name;
                cell.style.fontWeight = "bold";

            } else {
                cell = this.cellArr[rID];

                let v1 = this.field.getValueArr()[rID];
                let v2 = this.secondField ? this.secondField.getValueArr()[rID] : undefined;

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

/**
 * Fieldを更新するためのクラス。Fieldに依存。
 * addNewFields(field, id)でFieldを追加する。
 * updateAllFields()で、全てのFieldをアップデートする。
 */
const FieldUpdator = class {

    constructor(options) {
        this.updateId = 0;
        this.fieldArr = [];
        this.fieldDict = {};
        this.talentsFactor = options.talentsFactor;
        //外からこれらのプロパティを直接参照しないこと！！
    }

    // addNewField(field, id) {
    //     this.fieldArr.push(field);
    //     this.fieldDict[id] = field;
    // }

    //いきなりfieldDictを設定する
    setFieldDict(fieldDict) {
        this.fieldDict = fieldDict;
        this.fieldArr = [];
        for (const id in fieldDict) this.fieldArr.push(fieldDict[id]);;
    }

    updateAll() {
        this.updateId++;
        this.fieldArr.forEach(f => { f.setTalentsFactor(this.talentsFactor); });
        this.fieldArr.forEach(f => { f.update(this.updateId); });
    }

    // getFieldArr() {
    //     return this.fieldArr;
    // }
}

/**全体のアップデート用。FieldもColumnもアップデート。
 * FieldUpdatorとColumnに依存。
 * @param {*} options columnArrとfieldUpdator。
 */
const WholeUpdator = class {
    constructor(options) {
        this.columnArr = options.columnArr;
        this.fieldUpdator = options.fieldUpdator;
    }

    setColumnArr(c) {
        this.columnArr = c;
    }

    updateWhole() {
        this.fieldUpdator.updateAll();
        this.columnArr.forEach(c => { c.updateView() });
    }
}


const buildFieldColumnRelation = function (fieldDict, columnArr) {
    for (const id in fieldDict) {
        const field = fieldDict[id];
        if (field.baseFieldId) {
            field.baseField = fieldDict[field.baseFieldId];
            field.baseField.pushDependentField(field);
        }
        if (field.secondBaseFieldId) {
            field.secondBaseField = fieldDict[field.secondBaseFieldId];
            field.secondBaseField.pushDependentField(field);
        }
    }

    columnArr.forEach(column => {
        column.field = fieldDict[column.fieldId];

        if (column.secondFieldId) {
            column.secondField = fieldDict[column.secondFieldId];
        }
    });
}




export const main = ($) => {

    const TABLE = document.createElement("table");

    const TALENTS_FACTOR = new Talents(
        TALENTS_FACTOR_DEFAULT.reload,
        TALENTS_FACTOR_DEFAULT.medic,
        TALENTS_FACTOR_DEFAULT.duplicator,
        TALENTS_FACTOR_DEFAULT.poison,
        TALENTS_FACTOR_DEFAULT.CPoison,
    )

    const fieldUpdator = new FieldUpdator({
        talentsFactor: TALENTS_FACTOR,
    });

    const wholeUpdator = new WholeUpdator({
        "fieldUpdator": fieldUpdator
    });

    {//ステータスを生成
        const TBODY = document.createElement("tbody");

        let fieldDict = {};
        let columnArr = [];

        //----- Field -----
        $.options.fieldOptions ??= {};
        //レアリティ
        fieldDict["petalRarity"] = new Field({
            "type": "constant",
            "base": 0,
            "increase": 1,
        });

        //petalCount(ユーザーに上書きされないField)
        let petalCountIsHidden = !$.options.petalUniqueCounts && !($.options.petalCount && $.options.petalCount != 1);
        {
            let popts = {}

            if ($.options.petalUniqueCounts) {
                popts = {
                    "type": "unique",
                    "uniqueDatas": $.options.petalUniqueCounts,
                    "isHidden": true,
                }
            } else {
                popts = {
                    "type": "constant",
                    "increase": 0,
                    "base": $.options.petalCount ?? 1,
                    "isHidden": true,
                }
            }
            fieldDict["petalCount"] = new Field(popts); //ユーザー入力値

            let popts2 = {
                "isHidden": petalCountIsHidden,
                "relatedTalent": "duplicator",
                "type": "FplusB",
                "base": 0,
                "baseFieldId": "petalCount",
            }
            fieldDict["petalCount2"] = new Field(popts2); //Duplicatorの影響を受ける

            let popts3 = {
                "isHidden": true,
                "type": "FoverF",
                "baseFieldId": "petalCount2",
                "secondBaseFieldId": "petalCount",
            }
            fieldDict["petalCountChangeRatio"] = new Field(popts3); //増加割合
        }

        //総攻撃力(基礎)
        fieldDict["damage"] = new Field($.options.fieldOptions.damage ?? {
            "type": "normal",
            "base": $.options.baseDamage ?? 0,
        });

        //単体攻撃力
        fieldDict["singleDamage"] = new Field($.options.fieldOptions.singleDamage ?? {
            "type": "FoverF",
            "baseFieldId": "damage",
            "secondBaseFieldId": "petalCount",
        });

        //総攻撃力（最終）
        fieldDict["finalDamage"] = new Field($.options.fieldOptions.finalDamage ?? {
            "type": "FtimesF",
            "baseFieldId": "damage",
            "secondBaseFieldId": "petalCountChangeRatio",
        });

        //体力の和
        fieldDict["healthSum"] = new Field($.options.fieldOptions.healthSum ?? {
            "type": "normal",
            "base": $.options.baseHealth ?? 0,
        });

        //体力
        fieldDict["health"] = new Field($.options.fieldOptions.health ?? {
            "type": "FoverF",
            "baseFieldId": "healthSum",
            "secondBaseFieldId": "petalCount",
        });

        //リロード
        {
            let ropts = {
                "relatedTalent": "reload",
            }
            if ($.options.reloadUniqueTimes) {
                Object.assign(ropts, {
                    "type": "unique",
                    "uniqueDatas": $.options.reloadUniqueTimes,
                });
            } else {
                Object.assign(ropts, {
                    "type": "constant",
                    "base": $.options.reloadTime ?? 0,
                    "increase": 0,
                });
            }
            fieldDict["reload"] = new Field($.options.fieldOptions.reload ?? ropts)
        }

        //セカンドリロード
        {
            let ropts = {
            }
            if ($.options.secondReloadUniqueTimes) {
                Object.assign(ropts, {
                    "type": "unique",
                    "uniqueDatas": $.options.secondReloadUniqueTimes,
                })
            } else {
                Object.assign(ropts, {
                    "type": "constant",
                    "base": $.options.secondReloadTime ?? 0,
                    "increase": 0,
                })
            }
            fieldDict["secondReload"] = new Field($.options.fieldOptions.secondReload ?? ropts);
        }

        //毒
        fieldDict["poison"] = new Field($.options.fieldOptions.poison ?? {
            "type": "normal",
            "base": $.options.basePoison ?? 0,
            "relatedTalent": "poison",
        });

        //毒持続
        fieldDict["poisonDuration"] = new Field($.options.fieldOptions.poisonDuration ?? {
            "type": "constant",
            "base": $.options.poisonDuration ?? 0,
            "increase": 0,
            "relatedTalent": "CPoison",
        });

        //毒秒間
        fieldDict["poisonPerSec"] = new Field($.options.fieldOptions.poisonPerSec ?? {
            "type": "FoverF",
            "baseFieldId": "poison",
            "secondBaseFieldId": "poisonDuration",
            "isHidden": true,
        });


        //-----Column -----
        $.options.columnOptions ??= {};

        columnArr.push(new Column({
            "name": "レアリティ",
            "viewType": "rarity",
            "fieldId": "petalRarity",
            "width": 95,
        }));

        $.options.columnOptions.petalCount = {
            "name": "ペタルの個数",
            "viewType": "normal",
            "toFixed": 0,
            "last": "個",
            "fieldId": "petalCount2",
            "isHidden": petalCountIsHidden,
        };

        $.options.columnOptions.damage ??= {
            "name": petalCountIsHidden ? "攻撃力" : "総攻撃力",
            "viewType": petalCountIsHidden ? "normal" : "damage",
            "fieldId": "finalDamage",
            "secondFieldId": "singleDamage",
            "isHidden": !$.options.baseDamage,
        }

        $.options.columnOptions.health ??= {
            "name": "体力",
            "viewType": "normal",
            "fieldId": "health",
            "isHidden": !$.options.baseHealth,
        }

        $.options.columnOptions.reload ??= {
            "name": "再生時間",
            "viewType": "reload",
            "fieldId": "reload",
            "secondFieldId": "secondReload",
            "last": "s",
            "isHidden": !($.options.reloadTime) && !($.options.reloadUniqueTimes),
        }

        $.options.columnOptions.poison ??= {
            "name": "毒",
            "viewType": "poison",
            "fieldId": "poison",
            "secondFieldId": "poisonDuration",
            "isHidden": !$.options.basePoison,
        }
        {
            let arr = ["petalCount", "damage", "health", "reload", "poison"];
            arr.forEach(e => {
                if (!$.options.columnOptions[e].isHidden) {
                    columnArr.push(new Column($.options.columnOptions[e]));
                }
            });
        }

        //specialStatusは、FieldとColumnの簡易指定版
        //isHiddenを使用することで、specialFieldArrとして扱うことができるようにする
        //Fieldに新しいプロパティが追加されるたびにここを更新すること
        //specialStatus
        if ($.options.specialStatus) {

            for (let i = 0; i < $.options.specialStatus.length; i++) {

                let opts = $.options.specialStatus[i];
                let Fopts, Copts;

                {
                    //specialStatusのオプションを、fieldとcolumnに振り分ける。補完は行わない
                    const convertSpecialStatusInto = function (options) {

                        let Fopts = {};
                        let Copts = {};

                        //type
                        switch (options.type) {
                            case "rarity":
                                Fopts.type = "unique";
                                break;
                            default:
                                Fopts.type = options.type;
                        }

                        switch (options.type) {
                            case "rarity":
                                Copts.viewType = "rarity";
                                break;
                            default:
                                Copts.viewType = "normal";
                        }

                        //other
                        Fopts.base = options.base;
                        Fopts.increase = options.increase;
                        if (opts.type == "rarity") Fopts.uniqueDatas = options.uniqueDatas ?? options.uniqueRarityNumbers; //後方互換
                        if (opts.type == "unique") Fopts.uniqueDatas = options.uniqueDatas;
                        Fopts.baseFieldId = options.baseFieldId;
                        Fopts.secondBaseFieldId = options.secondBaseFieldId;

                        Copts.name = options.name;
                        Copts.last = options.last;
                        Copts.width = options.width;
                        Copts.toFixed = options.toFixed ?? DEFAULT_TOFIXED_NUM;
                        Copts.isHidden = options.isHidden ?? false;

                        return { field: Fopts, column: Copts };
                    }
                    let converted = convertSpecialStatusInto(opts);
                    Fopts = converted.field;
                    Copts = converted.column;
                }

                //補完
                let id = opts.id ?? "special_" + i;
                if (Fopts.type == "heal") { //heal処理

                    let secondId = id + "_2";
                    let Fopts2 = {};
                    Object.assign(Fopts2, Fopts)
                    Fopts2.relatedTalent ??= "medic";
                    fieldDict[secondId] = new Field(Fopts2);
                    Fopts = {
                        type: "FtimesF",
                        baseFieldId: secondId,
                        secondBaseFieldId: "petalCountChangeRatio",
                    }
                }
                Copts.fieldId = id;

                fieldDict[id] = new Field(Fopts);
                if (!Copts.isHidden) columnArr.push(new Column(Copts));
            }
        }

        if ($.options.specialColumnArr) { //超上級者向け
            for (let i = 0; i < $.options.specialColumnArr.length; i++) {
                let opts = $.options.specialColumnArr[i];
                columnArr.push(new Column(opts));
            }
        }

        //関係作成
        buildFieldColumnRelation(fieldDict, columnArr);

        //cell生成
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
            if (rID != -1 && rID < $.options.leastRarity) TR.style.display = "none";
        }

        //アップデート系
        fieldUpdator.setFieldDict(fieldDict);
        wholeUpdator.setColumnArr(columnArr);
        wholeUpdator.updateWhole();

        TABLE.appendChild(TBODY);
    }
    {//表を挿入
        const DIV = document.getElementById($.originId).parentNode;
        DIV.parentNode.insertBefore(TABLE, DIV);
        {
            const P = document.createElement("p");
            P.innerText = "このステータスは自動生成されています。詳しくは";
            const A = document.createElement("a");
            A.innerText = "こちら";
            A.href = "/wiki/特殊構文について";

            P.appendChild(A);
            DIV.appendChild(P);
        }
    }
    {//タレント選択機能
        const createPullDownMenu = (options = []) => {//プルダウンメニュー用の要素を作成
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
        const pulldownMenufy = (ul, callBack) => {//引数のUL要素をプルダウンメニュー化
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

        const DEFAULT_LABEL_NONE = {
            label: "なし",
            value: -1,
            color: "var(--c-text_black)",
            backgroundColor: "var(--c-gray_dark)",
        }

        const DEFAULT_LABEL = [
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

        const RELOAD = createPullDownMenu([
            DEFAULT_LABEL_NONE,
            DEFAULT_LABEL[0],
            DEFAULT_LABEL[1],
            DEFAULT_LABEL[2],
            DEFAULT_LABEL[3],
            DEFAULT_LABEL[4],
            DEFAULT_LABEL[5],
            DEFAULT_LABEL[6],
            DEFAULT_LABEL[7],

        ]);
        const MEDIC = createPullDownMenu([
            DEFAULT_LABEL_NONE,
            DEFAULT_LABEL[0],
            DEFAULT_LABEL[1],
            DEFAULT_LABEL[2],
            DEFAULT_LABEL[3],
            DEFAULT_LABEL[4],
            DEFAULT_LABEL[5],
            DEFAULT_LABEL[6],
            DEFAULT_LABEL[7],
        ]);

        const DUPLICATOR = createPullDownMenu([
            DEFAULT_LABEL_NONE,
            DEFAULT_LABEL[2],
        ]);

        const POISON = createPullDownMenu([
            DEFAULT_LABEL_NONE,
            DEFAULT_LABEL[0],
            DEFAULT_LABEL[1],
            DEFAULT_LABEL[2],
            DEFAULT_LABEL[3],
            DEFAULT_LABEL[4],
            DEFAULT_LABEL[5],
            DEFAULT_LABEL[6],
            DEFAULT_LABEL[7],
        ]);

        const CPOISON = createPullDownMenu([
            DEFAULT_LABEL_NONE,
            DEFAULT_LABEL[6],
        ]);

        {//見出し
            const H5 = document.createElement("h5");
            H5.textContent = "タレントを選択"
            TABLE.before(H5);
        }
        {//選択
            const SECTION = document.createElement("section");
            SECTION.classList.add("talents");
            {//リロード
                const DIV = document.createElement("div");
                const LABEL = document.createElement("label");
                LABEL.textContent = "リロード（Reload）";

                DIV.appendChild(LABEL);
                DIV.appendChild(RELOAD);
                SECTION.appendChild(DIV);
            }
            {//回復
                const DIV = document.createElement("div");
                const LABEL = document.createElement("label");
                LABEL.textContent = "回復（Medic）";

                DIV.appendChild(LABEL);
                DIV.appendChild(MEDIC);
                SECTION.appendChild(DIV);
            }
            {//Duplicator
                const DIV = document.createElement("div");
                const LABEL = document.createElement("label");
                LABEL.textContent = "複製機（Duplicator）";

                DIV.appendChild(LABEL);
                DIV.appendChild(DUPLICATOR);
                SECTION.appendChild(DIV);
            }
            {//Poison
                const DIV = document.createElement("div");
                const LABEL = document.createElement("label");
                LABEL.textContent = "毒（Poison）";

                DIV.appendChild(LABEL);
                DIV.appendChild(POISON);
                SECTION.appendChild(DIV);
            }

            {//Concentrated Poison
                const DIV = document.createElement("div");
                const LABEL = document.createElement("label");
                LABEL.textContent = "濃縮された毒（Concentrated poison）";

                DIV.appendChild(LABEL);
                DIV.appendChild(CPOISON);
                SECTION.appendChild(DIV);
            }
            TABLE.before(SECTION);
        }
        {//プルダウンメニュー化
            pulldownMenufy(RELOAD, v => {
                TALENTS_FACTOR.reload = TALENTS_FACTOR_DEFAULT.reload + (TALENTS_VAL.reload[v] ?? 0);
                wholeUpdator.updateWhole();
            });
            pulldownMenufy(MEDIC, v => {
                TALENTS_FACTOR.medic = TALENTS_FACTOR_DEFAULT.medic + (TALENTS_VAL.medic[v] ?? 0);
                wholeUpdator.updateWhole();
            });
            pulldownMenufy(DUPLICATOR, v => {
                TALENTS_FACTOR.duplicator = TALENTS_FACTOR_DEFAULT.duplicator + (TALENTS_VAL.duplicator[v] ?? 0);
                wholeUpdator.updateWhole();
            });
            pulldownMenufy(POISON, v => {
                TALENTS_FACTOR.poison = TALENTS_FACTOR_DEFAULT.poison + (TALENTS_VAL.poison[v] ?? 0);
                wholeUpdator.updateWhole();
            });

            pulldownMenufy(CPOISON, v => {
                TALENTS_FACTOR.CPoison = TALENTS_FACTOR_DEFAULT.CPoison + (TALENTS_VAL.CPoison[v] ?? 0);
                wholeUpdator.updateWhole();
            });
        }
    }
}
