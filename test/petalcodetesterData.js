export const options = {
    name: "Dahlia",
    petalCount: 3,
    baseHealth: 5,
    baseDamage: 5,
    reloadTime: 1.5,
    secondReloadTime: 1.5,
    calcDPS: false,
    leastRarity: 1,
    specialStatus: [
        {
            id: "healpoint",
            type: "heal",
            last: "",
            base: 1.25,
            isHidden: true,
        },
        {
            id: "reloadTimeSum",
            type: "FplusF",
            baseFieldId: "reload",
            secondBaseFieldId: "secondReload",
            isHidden: true,
        },
        {
            id: "totalheal",
            name: "総回復",
            type: "FtimesF",
            baseFieldId: "healpoint",
            secondBaseFieldId: "petalCount"
        },
        {
            name: "秒間回復",
            type: "FoverF",
            baseFieldId: "totalheal",
            secondBaseFieldId: "reloadTimeSum",
            last: "/s",
        },
    ]
};