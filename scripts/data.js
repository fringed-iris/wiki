//ローワ―キャメルケース

//初期化
export const florr = {}

//レアリティ関連のデータ
florr.rarity = {};
($ => {
    //レアリティID　←→　配列番号
    $.id = {};
    $.id[$.id["Cm"] = 0] = "Cm";
    $.id[$.id["Un"] = 1] = "Un";
    $.id[$.id["Re"] = 2] = "Re";
    $.id[$.id["Ep"] = 3] = "Ep";
    $.id[$.id["Lg"] = 4] = "Lg";
    $.id[$.id["My"] = 5] = "My";
    $.id[$.id["Ul"] = 6] = "Ul";
    $.id[$.id["Sp"] = 7] = "Sp";

    //レアリティID　←→　レアリティ名
    $.name = {};
    $.name[$.name["Common"] = "Cm"] = "Common";
    $.name[$.name["Unusual"] = "Un"] = "Unusual";
    $.name[$.name["Rare"] = "Re"] = "Rare";
    $.name[$.name["Epic"] = "Ep"] = "Epic";
    $.name[$.name["Legendary"] = "Lg"] = "Legendary";
    $.name[$.name["Mythic"] = "My"] = "Mythic";
    $.name[$.name["Ultra"] = "Ul"] = "Ultra";
    $.name[$.name["Super"] = "Sp"] = "Super";

    //レアリティID　→　レアリティ色
    $.color = {
        background: {
            borderMask: "#00000030",    //フチの色（シェーダー）
            [$.id[0]]: "#7eef6d",
            [$.id[1]]: "#ffe65d",
            [$.id[2]]: "#4d52e3",
            [$.id[3]]: "#861fde",
            [$.id[4]]: "#de1f1f",
            [$.id[5]]: "#1fdbde",
            [$.id[6]]: "#ff2b75",
            [$.id[7]]: "#2bffa3"
        },
        text: {
            [$.id[0]]: "#000",
            [$.id[1]]: "#000",
            [$.id[2]]: "#fff",
            [$.id[3]]: "#fff",
            [$.id[4]]: "#fff",
            [$.id[5]]: "#000",
            [$.id[6]]: "#fff",
            [$.id[7]]: "#000"
        }
    }
})(florr.rarity);

florr.rarity.length = Object.keys(florr.rarity.id).length / 2;

florr.themeColor = (() => {
    const ROOT = getComputedStyle(document.documentElement);

    return {
        theme: ROOT.getPropertyValue('--c-theme'),
        subTheme_dark: ROOT.getPropertyValue('--c-subTheme_dark'),
        subTheme_light: ROOT.getPropertyValue('--c-subTheme_light'),
        dark_gray: ROOT.getPropertyValue('--c-dark_gray')
    }
})();

florr.database = {//ペタル、モブ関連のデータ
    //モブの体力比
    mobHealthFactor: [1.0, 3.75, 13.5, 54, 405, 2430, 29160, 1312200],
    //既定アーマー
    defaultArmor: 0.8,
    //それぞれのタレントのオリジナル値
    talentOriginalValue: {
        reload: 1,
        medic: 1,
        duplicator: 0,
        poison: 1,
        CPoison: 1,
        summoner: 1,
        luck: 0,
    },
    //それぞれのレアリティにおけるオリジナル値への加算値
    talentFactor: {
        reload: [-0.08, -0.16, -0.23, -0.29, -0.35, -0.41, -0.45, -0.50],
        medic: [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80],
        duplicator: [0, 0, 1],
        poison: [0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5],
        CPoison: [0, 0, 0, 0, 0, 0, -0.167777],
        summoner: [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80],
        luck: [0, 0, 0, 0.2, 0.4, 0.6, 0.8],
    },
}