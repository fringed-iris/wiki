const tips = ["Battery\u306fLightning\u306e\uff13\u500d\u306e\u7406\u8ad6\u5024DPS\u3092\u6301\u3064\u304c\u3001\u5b9f\u969b\u306b\u4f7f\u3046\u306e\u306f\u3051\u3063\u3053\u3046\u96e3\u3057\u3044\u3002",
"\u304b\u3064\u3066Lightning\u306f\u6700\u5f37\u3068\u547c\u3070\u308c\u3066\u3044\u307e\u3057\u305f\u3002",
"Yggdrasil\u3092\u843d\u3068\u3059\u306e\u306f\u9ec4\u8272\u3044\u30c6\u30f3\u30c8\u30a6\u30e0\u30b7\u3067\u3059\u3002\u305f\u3060\u3057\u3001Legendary\u4ee5\u4e0a\u3067\u3059\u3002",
"hide\u3055\u3093\u306f\u3001\u3053\u306ewiki\u306e\u7ba1\u7406\u4eba\u3067\u3059\u3002",
"hana\u3055\u3093\u306f\u3001\u524dwiki\u306e\u7ba1\u7406\u4eba\u3067\u3059\u3002",
"Honey\u306f\u9060\u8ddd\u96e2\u653b\u6483\u3059\u308b\u30e2\u30d6\u306b\u306f\u52b9\u304b\u306a\u3044\u3088\u3046\u3067\u3059\u3002",
"Heavy\u306f\u5143\u3005Heaviest\u3068\u3044\u3046\u540d\u524d\u3067\u3057\u305f\u3002\u65e7florr.io\u306b\u306fHeavy\u3068\u3044\u3046\u5225\u306e\u30da\u30bf\u30eb\u304c\u3042\u308a\u307e\u3057\u305f\u3002",
"\u65b0florr.io\u304c\u3067\u304d\u305f\u3059\u3050\u306e\u3053\u308d\u306f\u3001Ocean\u306f\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
"\u6614\u306e\u30b5\u30bd\u30ea\u306f\u3001\u4eca\u306e\u30af\u30e2\u306e\u3088\u3046\u306a\u6bd2\u3067\u8972\u3044\u639b\u304b\u3063\u3066\u304d\u307e\u3057\u305f\u3002",
"\u6614\u306eMythic Egg\u304b\u3089\u306f\u3001Hornet\u304c2\u4f53\u51fa\u73fe\u3057\u3066\u3044\u307e\u3057\u305f\u3002",
"\u6614\u306eStinger\u306e\u518d\u751f\u6642\u9593\u306f2.5s\u3067\u3057\u305f\u3002",
"\u5b9f\u88c5\u3055\u308c\u305f\u76f4\u5f8c\u306ePowder\u306f\u52b9\u679c\u304c\u91cd\u8907\u3057\u307e\u3057\u305f\u3002",
"Sand\u3068Light\u3067\u306f\u3001\u57fa\u672c\u7684\u306bSand\u306e\u65b9\u304c\u512a\u79c0\u3067\u3059\u3002",
"Digger\u306fdigdig.io\u304b\u3089\u3084\u3063\u3066\u304d\u307e\u3057\u305f\u3002",
"\u8d85\u30ec\u30a2\u30e2\u30d6\u3067\u3042\u308bSquare\u306f\u3001Diep.io\u3067\u306f\u6700\u5f31\u306e\u56f3\u5f62\u3067\u3059\u3002",
"\u6700\u8fd1\u306fSuper\u30da\u30bf\u30eb\u3092\u30af\u30e9\u30d5\u30c8\u3059\u308b\u4eba\u3082\u5897\u3048\u3066\u304d\u307e\u3057\u305f\u3002\u6642\u4ee3\u3067\u3059\u306d\u3002",
"Hornet\u306f\u6614\u3001\u982d\u304b\u3089\u91dd\u3092\u767a\u5c04\u3057\u3066\u3044\u307e\u3057\u305f\u3002",
"Dandelion\u306f\u30bf\u30f3\u30dd\u30dd\u3068\u3044\u3046\u610f\u5473\u3067\u3059\u3002\u30c0\u30f3\u30c7\u30e9\u30a4\u30aa\u30f3\u3068\u8aad\u307f\u307e\u3059\u3002",
"florr.io\u306e\u30af\u30e9\u30d5\u30c8\u306f\u3001\u6614\u306f\u5931\u6557\u3059\u308c\u3070\u3059\u308b\u307b\u3069\u78ba\u7387\u304c\u4e0a\u304c\u308b\u3088\u3046\u306b\u306a\u3063\u3066\u3044\u307e\u3057\u305f\u3002",
"Digger\u306e\u30c9\u30ed\u30c3\u30d7\u306f\u3001Digger\u3068\u4e00\u7dd2\u306b\u51fa\u3066\u304d\u305f\u30a2\u30ea\u3078\u306e\u30c0\u30e1\u30fc\u30b8\u91cf\u306b\u3088\u3063\u3066\u6c7a\u307e\u308a\u307e\u3059\u3002",
"\u6614\u306eHoney\u306f\u3001PvP\u3067\u5f53\u3066\u305f\u76f8\u624b\u306e\u30da\u30bf\u30eb\u306e\u56de\u8ee2\u901f\u5ea6\u3092\u843d\u3068\u3059\u4ed5\u69d8\u3067\u3057\u305f\u3002",
"Pearl\u306e\u30b9\u30c6\u30fc\u30bf\u30b9\u306f\u3001Rock\u3068\u307b\u307c\u540c\u3058\u3067\u3059\u3002",
"\u304b\u3064\u3066florr.io\u306b\u306f\u30b9\u30af\u30a2\u30c9\u304c\u3042\u308a\u307e\u3057\u305f\u304c\u3001\u6d88\u6ec5\u3057\u3001\u6700\u8fd1\u5fa9\u6d3b\u3057\u307e\u3057\u305f\u3002",
"diep.io\u3092\u3084\u3063\u305f\u3053\u3068\u306f\u3042\u308b\uff1f",
"\u30da\u30bf\u30eb\u306b\u306f\u3001\u975e\u5e38\u306b\u8fd1\u3044\u6575\u306b\u81ea\u52d5\u3067\u8fd1\u3065\u304f\u4ed5\u69d8\u304c\u3042\u308a\u307e\u3059\u3002",
"daromanimu.D.B\u3055\u3093\u306f\u3001florr.io\u306e\u52d5\u753b\u3082\u6295\u7a3f\u3057\u3066\u3044\u308byoutuber\u3067\u3059\u3002",
"Queen Fire Ant\u306f\u3001\u6614\u306fUltra\u4ee5\u4e0a\u3067\u7279\u5b9a\u306e\u5834\u6240\u3067\u3057\u304b\u5b58\u5728\u3057\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
"Bubble\u3067\u79fb\u52d5\u3057\u305f\u5f8c\u3059\u3050\u306b\u30df\u30b5\u30a4\u30eb\u3092\u6483\u3064\u3068\u5f8c\u308d\u5411\u304d\u306b\u767a\u5c04\u3055\u308c\u307e\u3059\u3002",
"Mythic\u4ee5\u4e0b\u306e\u30e2\u30d6\u306e\u30c9\u30ed\u30c3\u30d7\u3092\u7372\u5f97\u3067\u304d\u308b\u306e\u306f\u3001\u305d\u306e\u30e2\u30d6\u306b\u6700\u3082\u5927\u304d\u306a\u30c0\u30e1\u30fc\u30b8\u3092\u4e0e\u3048\u305f4\u4eba\u3067\u3059\u3002",
"\u30de\u30c3\u30d7\u306e\u9685\u306b\u4f53\u3092\u62bc\u3057\u4ed8\u3051\u305f\u72b6\u614b\u3067Air1\u3001Soil\u3092\u88c5\u7740\u3057\u3066\u3082\u3001\u4f53\u306f\u5927\u304d\u304f\u306a\u308a\u307e\u305b\u3093\u3002",
"Discord\u3067\u30b5\u30a4\u30f3\u30a4\u30f3\u3057\u306a\u3044\u3068\u3001\u3061\u3087\u3063\u3068\u3057\u305f\u3053\u3068\u3067\u30c7\u30fc\u30bf\u304c\u5439\u304d\u98db\u3076\u304b\u3082\u2026\u3002",
"M28\u306fflorr.io\u306e\u6539\u9020\u306b\u5bfe\u3057\u3066\u57f7\u62d7\u306b\u5bfe\u7b56\u3092\u3057\u3066\u3044\u307e\u3059\u3002",
"Basic\u306f\u5f31\u3044\u3067\u3059\u3002\u672c\u5f53\u306b\u5f31\u3044\u3067\u3059\u3002",
"Rock\u304a\u3088\u3073Bone\u306fAnt\u306a\u3069\u653b\u6483\u529b\u306e\u4f4e\u3044\u6575\u3078\u306e\u653b\u6483\u306b\u9069\u3057\u3066\u3044\u307e\u3059\u3002",
"Shell (mob)\u306f\u9ad8\u30a2\u30fc\u30de\u30fc\u306e\u4ee3\u308f\u308a\u306b\u306b\u30b7\u30fc\u30eb\u30c9\u304c\u8ffd\u52a0\u3055\u308c\u307e\u3057\u305f\u3002\u3053\u3061\u3089\u3082\u56de\u5fa9\u304c\u53ef\u80fd\u3067\u3059\u3002\r\n",
"Jelly\u3067\u30e2\u30d6\u3092\u5439\u3063\u98db\u3070\u3059\u3053\u3068\u306f\u6709\u52b9\u306a\u6226\u8853\u3067\u3059\u2026\u2026\u3088\u304f\u5473\u65b9\u3092\u5dfb\u304d\u8fbc\u307f\u307e\u3059\u304c\u3002",
"Reload\u304c\u4e0a\u304c\u308c\u3070\u4e0a\u304c\u3063\u3066\u3044\u304f\u307b\u3069Light\u306f\u3069\u3046\u3057\u3088\u3046\u3082\u306a\u3044\u30da\u30bf\u30eb\u306b\u306a\u3063\u3066\u3044\u304d\u307e\u3059\u3002",
"Heavy\u3092\u88c5\u5099\u3057\u3066\u3044\u308b\u3068Roach\u306e\u7a81\u9032\u306b\u3042\u308b\u7a0b\u5ea6\u8010\u3048\u3089\u308c\u307e\u3059\u3002",
"\u91cd\u8907\u4e0d\u53ef\u80fd\u306a\u30da\u30bf\u30eb\u3092\u8907\u6570\u500b\u88c5\u5099\u3057\u305f\u5834\u5408\u3001\u4e00\u756a\u5de6\u5074\u306e\u3057\u304b\u751f\u6210\u3055\u308c\u307e\u305b\u3093\u3002",
"Poo\u306f\u6709\u80fd\u3067\u3059\u3002spiral\u3084Crab Kingdom\u3067\u5f79\u7acb\u3061\u307e\u3059\u3002\u3057\u304b\u3057\u3001\u306a\u305c\u304b\u4ed8\u3051\u305f\u304f\u306a\u3044\u306e\u306f\u79c1\u3060\u3051\u3067\u3057\u3087\u3046\u304b\uff1f",
"Leaf\u306f\u76f8\u5f53\u5f31\u4f53\u5316\u3055\u308c\u307e\u3057\u305f\u304c\u3001\u305d\u308c\u3067\u3082\u4eca\u3082\u305d\u3053\u305d\u3053\u4f7f\u3048\u307e\u3059\u3002",
"Lightning\u306fLeech\u306b\u7d76\u5927\u306a\u52b9\u679c\u3092\u767a\u63ee\u3057\u307e\u3059\u3002",
"Grapes\u306fPeas\u3088\u308a\u4e00\u5f3e\u306e\u30c0\u30e1\u30fc\u30b8\u304c\u9ad8\u3044\u3067\u3059\u304c\u3001\u6bd2\u304c\u91cd\u8907\u3057\u307e\u305b\u3093\u3002",
"Salt\u3068Cactus\u3092\u4ed8\u3051\u308bPvP\u306e\u6226\u6cd5\u306f\u3001\u9ad8\u30b9\u30b3\u30a2\u30d7\u30ec\u30a4\u30e4\u30fc\u3092\u30ad\u30eb\u3059\u308b\u306e\u306b\u6700\u9069\u3067\u3059\u2026\u2026\u5341\u4e2d\u516b\u4e5d\u6068\u307e\u308c\u307e\u3059\u304c\u3002",
"Stinger\u306e\u5f31\u70b9\u306f\u3001\u4f4e\u4f53\u529b\u6545\u3069\u3093\u306a\u4e9b\u7d30\u306a\u653b\u6483\u306b\u3067\u3082\u53cd\u5fdc\u3057\u3066\u6d88\u3048\u3066\u3057\u307e\u3046\u3053\u3068\u3067\u3059\u3002",
"Ultra Honey\u304c\u3042\u308c\u3070\u3001\u305d\u308c\u306fAFK\u306b\u304a\u3044\u3066\u975e\u5e38\u306b\u5f79\u7acb\u3064\u3067\u3057\u3087\u3046\u3002",
"Antennae\u3092\u30bb\u30ab\u30f3\u30c0\u30ea\u306b\u5165\u308c\u3066\u304a\u3051\u3070\u3001\u30c1\u30e9\u30c3\u3068\u4e00\u77ac\u5468\u56f2\u306e\u69d8\u5b50\u3092\u78ba\u8a8d\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002",
"Uranium\u306f\u5e83\u7bc4\u56f2\u306b\u7d99\u7d9a\u7684\u306a\u30c0\u30e1\u30fc\u30b8\u3092\u4e0e\u3048\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002\u3082\u3061\u308d\u3093\u81ea\u5206\u306b\u3082\u3002",
"Tomato\u306f\u5358\u767a\u706b\u529b\u3067\u8a00\u3048\u3070Stinger\u3088\u308a\u512a\u79c0\u3067\u3059\u3002",
"Basil\u3068\u76f8\u6027\u304c\u3044\u3044\u306e\u306f\u3001\u653b\u6483\u3082\u56de\u5fa9\u3082\u3067\u304d\u308b\u30da\u30bf\u30eb\u2015\u3059\u306a\u308f\u3061\u3001Fang\u3067\u3059\u3002",
"Luck\u3092\u4e0a\u3052\u308b\u3068\u3001Dice\u306f\u3068\u3066\u3082\u512a\u79c0\u306a\u653b\u6483\u30da\u30bf\u30eb\u306b\u306a\u308a\u307e\u3059\u3002",
"Card\u306f\u30b9\u30fc\u30c8\uff08\u30de\u30fc\u30af\uff09\u3054\u3068\u306b\u30c0\u30e1\u30fc\u30b8\u3068HP\u304c\u5909\u308f\u308a\u307e\u3059\u3002",
"Coin\u306fTrader\u306824\u6642\u9593\u306b\uff11\u56de\u4ea4\u63db\u3067\u304d\u307e\u3059\u3002\u305f\u3060\u3001\u540c\u3058\u30ec\u30a2\u30ea\u30c6\u30a3\u306e\u653b\u6483\u30da\u30bf\u30eb\u3088\u308a\u306f\u5f31\u3044\u3002",
"\u30da\u30bf\u30eb\u306fMoon\u306e\u5468\u56f2\u3092\u56de\u8ee2\u3057\u307e\u3059\u3002\u3053\u308c\u3063\u3066\u885b\u661f\u3058\u3083\u306a\u304f\u3066\u60d1\u661f\u3067\u306f\uff1f",
"Hel\u306b\u3044\u308bGambler\u306f\u3001\u305d\u306e\u30ec\u30a2\u30ea\u30c6\u30a3\u306b\u5fdc\u3058\u305fCard Dice Chip\u7b49\u3092\u88c5\u5099\u3057\u3066\u3044\u307e\u3059\u3002",
"\u4eca\u306f\u306a\u304dCentralia\u306e\u6771\u5074\u306b\u306f\u3001\u4eca\u306f\u306a\u304dPvP\u30a8\u30ea\u30a2\u304c\u3042\u308a\u307e\u3057\u305f\u3002",
"Squad\u9593\u3067\u306f\u30c9\u30ed\u30c3\u30d7\u3092\u5171\u6709\u3067\u304d\u307e\u3059\u3002\u307e\u305f\u3001Achievement\u306eUseless\u3082Squad\u3092\u4f7f\u3063\u3066\u9054\u6210\u3067\u304d\u307e\u3059\u3002",
"Third Eye \u306f\u3001Spider\u304b\u3089\u307b\u3093\u306e\u5c0f\u3055\u306a\u78ba\u7387\u3067\u30c9\u30ed\u30c3\u30d7\u3057\u307e\u3059\u3002",
"Super\u30e2\u30d6\u3068\u8a00\u3063\u3066\u3082\u3001\u5f37\u3044\u30e2\u30d6\u3082\u5b58\u5728\u3059\u308c\u3070\u5f31\u3044\u30e2\u30d6\u3082\u5b58\u5728\u3057\u307e\u3059\u3002\u4e2d\u306b\u306f\u3055\u3089\u306a\u308b\u5f37\u5316\u3092\u5f97\u308b\u30e2\u30d6\u3082\u3044\u307e\u3059\u3002",
"\u904b\u55b6\u304c\u4f7f\u3046\u82b1\u306f\u3001\u6b6a\u3093\u3060\u9854\u3092\u3057\u3066\u3044\u307e\u3059\u3002 \u89e6\u3063\u3066\u307f\u305f\u3044\u3067\u3059\u306d\u3002\r\n",
"UBur\u304c\u3042\u308c\u3070\u3001MLight\u306e\u706b\u529b\u3092\u5927\u304d\u304f\u5e95\u4e0a\u3052\u3067\u304d\u307e\u3059\u3002",
"Mantis\u306e\u653e\u3064\u9632\u5fa1\u529b\u4f4e\u4e0b\u5f3e\u306f\u3001\u8907\u6570\u5f53\u305f\u308b\u3068\u975e\u5e38\u306b\u5384\u4ecb\u3067\u3059\u3002",
"Super Jellyfish\u306f\u88c5\u5099\u3057\u305f\u30da\u30bf\u30eb\u3092\u7834\u58ca+\u77ed\u6642\u9593\u518d\u88c5\u586b\u505c\u6b62\u3055\u305b\u308b\u6ce2\u52d5\u3092\u767a\u751f\u3055\u305b\u307e\u3059\u3002",
"Super Shell\u306f\u771f\u73e0\u3092\u653e\u3063\u3066\u304d\u307e\u3059\u3002\u305d\u308c\u3082\u305f\u304f\u3055\u3093\u3002",
"Super Rock\u306f\u30c0\u30e1\u30fc\u30b8\u3092\u53d7\u3051\u308b\u3068\u5c0f\u3055\u306aRock\u3092\u5468\u56f2\u306b\u653e\u3061\u307e\u3059\u3002",
"Super Hornet\u306f\u30df\u30b5\u30a4\u30eb\u3092\u6492\u304d\u6563\u3089\u3057\u3001\u6642\u306bUltra Hornet\u3092\u5927\u91cf\u306b\u53ec\u559a\u3057\u307e\u3059\u3002",
"Super Sandstorm\u306f\u30c0\u30a4\u30bd\u30f3\u306b\u3082\u5f15\u3051\u3092\u53d6\u3089\u306a\u3044\u5438\u5f15\u529b\u3092\u6301\u3063\u3066\u3044\u307e\u3059\u3002",
"Mana Orb\u3092\u624b\u306b\u5165\u308c\u3066\u9b54\u6cd5\u4f7f\u3044\u306b\u306a\u308a\u307e\u3057\u3087\u3046\uff01Ultra\u306f\u304b\u306a\u308a\u5f37\u3044",
"Factory\u306b\u5165\u308b\u3068\u3001\u82b1\u306f\u9ec4\u8272\u3068\u7070\u8272\u306b\u5206\u304b\u308c\u3066\u4e92\u3044\u306b\u653b\u6483\u3057\u5408\u3046\u3053\u3068\u306b\u306a\u308a\u307e\u3059\u3002",
"florr.io\u306e\u65e5\u672c\u8a9e\u7248\u306f\u4e3b\u306bfleepoint\u3055\u3093\u306b\u3088\u3063\u3066\u4f5c\u6210\u3055\u308c\u307e\u3057\u305f\u3002",
"\u6700\u521d\u671f\u306e\u30de\u30c3\u30d7\u306f\u56db\u89d2\u3044\u5f62\u3067\u3057\u305f\u3002\u307f\u3093\u306a\u9685\u3067\u6226\u3063\u3066\u3044\u305f\u306e\u3067\u3001\u5186\u30de\u30c3\u30d7\u306b\u306a\u3063\u305f\u3068\u304d\u306b\u307f\u3093\u306a\u7d76\u53eb\u3057\u307e\u3057\u305f\u3002",
"\u6614\u306f\u30de\u30c3\u30d7\u306e\u80cc\u666f\u306f\u306a\u304f\u3001\u5730\u5f62\u306a\u3069\u3082\u5b58\u5728\u3057\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u6bba\u98a8\u666f\u306a\u5186\u3044\u30de\u30c3\u30d7\u3067\u3059\u3002",
"florr.io\u306f\u672c\u6765PvP\u30b2\u30fc\u30e0\u3068\u3057\u3066\u30b9\u30bf\u30fc\u30c8\u3057\u307e\u3057\u305f\u3002\u3061\u306a\u307f\u306bPvP\u304c\u6d88\u3048\u305f\u6642\u671f\u304c\u3042\u308a\u307e\u3057\u305f\u3002\u5b9f\u306b\u5909\u5316\u306e\u6fc0\u3057\u3044\u30b2\u30fc\u30e0\u3067\u3059\u3002",
"Unusual\u4ee5\u4e0a\u306eBasic\u306f\u3001PvP\u3067\u4ed6\u30d7\u30ec\u30a4\u30e4\u30fc\u3092\u5012\u3057\u3066\u624b\u306b\u5165\u308c\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002",
"\u541b\u304c\u3053\u308c\u3092\u8aad\u3093\u3067\u3044\u308b\u3068\u3044\u3046\u3053\u3068\u306f\u541b\u306f\u3053\u308c\u3092\u8aad\u3093\u3067\u3044\u308b\u3068\u3044\u3046\u3053\u3068\u3060\u306d\u3002\r\n",
"\u6642\u9593\u306f\u30c1\u30af\u30bf\u30af\u3068\u904e\u304e\u3066\u3044\u304f\u3001\u541b\u306f\u52c9\u5f37\u3057\u3066\u308b\uff1f",
"\u30af\u30e9\u30d5\u30c8\u904b\u304c\u826f\u304f\u306a\u3044\uff1f\u5927\u4e08\u592b\u3001\u305d\u308c\u306f\u4eba\u751f\u306e\u904b\u3092\u6d6a\u8cbb\u3057\u3066\u306a\u3044\u3060\u3051\u3060\u3002",
"\u904a\u3073\u3059\u304e\u306a\u3044\u3088\u3046\u306b\u3001\u9014\u4e2d\u3067\u76ee\u3092\u9589\u3058\u3066\u4f11\u3093\u3060\u65b9\u304c\u3044\u3044\u3088",
"JP wiki\u306f\u7686\u69d8\u306e\u60c5\u5831\u3068\u7de8\u96c6\u3067\u6210\u308a\u7acb\u3063\u3066\u3044\u307e\u3059\uff01\\n\u307f\u3093\u306a\u3001\u3042\u308a\u304c\u3068\u3046\uff01",
"\u5f57\u661f\u306e\u5982\u304f\u5c3e\u3092\u5f15\u304f\u306e\u306fSuper petal\uff01",
"\u9ec4\u8272\u3044\u56db\u89d2\u306fdiep\u304b\u3089\u306e\u8d08\u308a\u7269\u3067\u3059\u3002\r\n",
"\u7279\u5b9a\u306e\u30e2\u30d6\u306e\u6e67\u304d\u5834\u6240\u304c\u5206\u304b\u3089\u306a\u3044\uff1fJP wiki\u3067\u8abf\u3079\u3066\u307f\u3088\u3046\uff01",
"\u3053\u308c\u306f\u3001\u87f2\u9054\u306b\u596a\u308f\u308c\u305f\u4e16\u754c\u3092\u53d6\u308a\u623b\u3059\u3001\u5c0f\u3055\u306a\u82b1\u9054\u306e\u7269\u8a9e\u3002(\u9055\u3046",
"florr.io\u306b\u306f0.001%\u3088\u308a\u5c0f\u3055\u3044\u30c9\u30ed\u30c3\u30d7\u7387\u304c\u5b58\u5728\u3057\u307e\u3059\u3002",
"\u5fc5\u8981\u306a\u306e\u306f\u30019\u5272\u306e\u904b\u30011\u5272\u306ePS\u3002",
"g\u30ad\u30fc\u3092\u62bc\u3059\u3068\u3001\u30da\u30bf\u30eb\u306e\u30ec\u30a2\u5ea6\u304c\u898b\u3089\u308c\u307e\u3059\u3002\r\n",
"florr paradox\u3068\u547c\u3070\u308c\u308b\u6050\u308d\u3057\u3044\u73fe\u8c61\u304c\u3042\u308b\u3002\u4f8b\u3048\u3070\u3001Ubone\u3092\u4f5c\u308b\u305f\u3081\u306b\u306fUbone\u304c\u9069\u3057\u3001Uwing\u3092\u4f5c\u308b\u305f\u3081\u306b\u306fUwing\u304c\u9069\u3057\u3066\u3044\u308b\u77db\u76fe\u3002",
"5\u3064\u306e\u30d0\u30a4\u30aa\u30fc\u30e0\u306b\u306f\u305d\u308c\u305e\u308c\u57fa\u672c\u306e\u30b9\u30dd\u30fc\u30f3\u5730\u70b9\u306e\u4ed6\u306b\u3001\u4e2d\u9593\u5730\u70b9\u3068\u3082\u547c\u3076\u3079\u304d\u30ea\u30b9\u30dd\u30fc\u30f3\u30dd\u30a4\u30f3\u30c8\u304c\u3044\u304f\u3064\u304b\u3042\u308a\u307e\u3059\u3002",
"florr.io\u3092\u958b\u767a\u3057\u305fM28\u306f\u3001\u4ed6\u306b\u3082agar.io\u3084diep.io\u3001digdig.io\u3092\u958b\u767a\u3057\u3066\u3044\u307e\u3059",
"\u5b9f\u306f\u3001Tips\u3092\u4e00\u65e5\u306b\u4f55\u500b\u3067\u3082\u898b\u308b\u65b9\u6cd5\u304c\u3042\u308a\u307e\u3059 \u3002\r\n",
"Mythic\u4ee5\u4e0a\u306e\u30af\u30e9\u30d5\u30c8\u3092\u3059\u308b\u6642\u306f\u3001\u7cbe\u795e\u306e\u4fdd\u5168\u306e\u305f\u3081\u306b\u6368\u3066\u308b\u6c17\u3067\u30af\u30e9\u30d5\u30c8\u3059\u308b\u3053\u3068\u3092\u304a\u52e7\u3081\u3057\u307e\u3059\u3002",
"\u904b\u55b6\u304cPvP\u30a4\u30d9\u30f3\u30c8\u3092\u884c\u3063\u305f\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\u7279\u5225\u306a\u30de\u30c3\u30d7\u304c\u7528\u610f\u3055\u308c\u3001\u6210\u7e3e\u4e0a\u4f4d\u8005\u306b\u306f\u5831\u916c\u304c\u4e0e\u3048\u3089\u308c\u305f\u3088\u3046\u3067\u3059 \u3002\r\n",
"Plank\u306e\u5f53\u305f\u308a\u5224\u5b9a\u306f\u306a\u305c\u304b\u304b\u306a\u308a\u30c7\u30ab\u3044\u3067\u3059\u3002\r\n",
"\u5927\u6614\u306eflorr\u3067\u306fpollen\u306f\u30d7\u30ec\u30a4\u30e4\u30fc\u304c\u6b7b\u306c\u3068\u304d\u306b\u30c9\u30ed\u30c3\u30d7\u3057\u3066\u3044\u307e\u3057\u305f\u3002\u6bba\u622e\u306e\u8c61\u5fb4\u3060\u3063\u305f\u3063\u3066\u308f\u3051\u3002",
"\u6614\u306fwing\u4e3b\u4f53\u306e\u30d3\u30eb\u30c9\u306fangel(\u5929\u4f7f)\u3068\u547c\u3070\u308c\u3066\u3044\u307e\u3057\u305f\u3002\u304b\u3063\u3053\u3044\u3044\uff01\u4eca\u3067\u3082\u5225\u306b\u4f7f\u3063\u3066\u3044\u3044\u3093\u3060\u3088\uff1f",
"\u73fe\u5728\u306eGarden\u306e\u30de\u30c3\u30d7\u306f\u3001\u304b\u3064\u3066\u306e\u30c0\u30f3\u30b8\u30e7\u30f3\u5236\u306e\u9803\u306eGarden\u306e\u30de\u30c3\u30d7\u306b\u9177\u4f3c\u3057\u3066\u3044\u307e\u3059\u3002",
"\u30b7\u30e7\u30c3\u30d7\u306b\u306f -50%\u3001-25%\u3001-10% \u5272\u5f15\u304c\u3042\u308a\u307e\u3059\u304c\u3001Super\u30da\u30bf\u30eb\u306b\u306f -50% \u5272\u5f15\u306f\u306a\u3044\u3088\u3046\u3067\u3059\u3002",
"Soldier Ant\u306fSalt\u3067\u306f\u306a\u304fGlass\u3092\u843d\u3068\u3059\u3088\u3046\u306b\u306a\u308a\u307e\u3057\u305f\u3002\u306a\u305c\uff1f",
"Mark\u306e\u521d\u671f\u30c7\u30b6\u30a4\u30f3\u306b\u306f\u5185\u5074\u306e5\u89d2\u5f62\u304c\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
"\u3053\u306ewiki\u306eTips\u306f\u5168\u90e8\u3067100\u500b\u3042\u308b\uff01\u541b\u306f\u30b3\u30f3\u30d7\u30ea\u30fc\u30c8\u3067\u304d\u308b\u304b\u306a\uff1f"]

const nowDate = new Date();
const today = nowDate.getDate() + ":" + nowDate.getMonth();
const tipsButton = document.getElementById("tipsButton");
tipsButton.addEventListener("click", onClick);
const tipsText = document.getElementById("tipsText");
if (localStorage.getItem('tipsDate') === today) {
    tipsText.textContent = localStorage.getItem('tipsText');
}

var deffForTips = {};
deffForTips.forSmallChanceText = false;
deffForTips.onClickFunc;

deffForTips.funcForSmallChance = (() => {
    let deff = deffForTips;
    let primeNumbers = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
    let stringArray = ["new", "io", "wiki", "florr", "hornex", "yoba", "fc2", "seesaa", "jp", "com", "I", "type", "while", "play", "old", "prime", "num", "str"];
    let keyWords = ["超ラッキー！　このメッセージを見つけたあなたには、秘密の言葉「", "」を教えましょう！ 意味が分からない？　そりゃ、意味なんてないからね！", "レタスは", "トマトは", "ナスは", "ニンジンは", "キャベツは", "ダイコンは", "ジャガイモは", "キュウリは", "スイカは", "塩を振ってから", "砂糖を振ってから", "コショウを振ってから", "醤油をかけてから", "みそ漬けにしてから", "めんつゆを使って", "しょうがを使って", "50分", "30分", "10分", "炒めると", "煮ると", "焼くと", "煮詰めると", "じっくり蒸すと", "カラッと揚げると", "生だと", "冷やすと", "凍らせると", "燻製にすると", "熟成させると", "うまい", "味がよい", "まずい", "食えたもんじゃない", "信じられないほどうまい", "ありえんほどうまい", "飽きが来ない", "淡泊になる"];
    let redSonic = (() => {
        let tyu = stringArray[Math.floor(Math.random() * 15)] + stringArray[Math.floor(Math.random() * 15)] + stringArray[Math.floor(Math.random() * 15)];
        stringArray.push(tyu);
        deff.strAry = stringArray;
        return tyu;
    })();
    deff.onClickFunc = (() => {
        let w = deff.w();
        let answerArray = [];
        let dataOfDate = getDataOfDate();
        let uri = new URL(window.location.href);
        let uploadData = {
            timeCode: "",
            gotTicket: false,
            blueSonic: false,
        }
        function ZeroPadding(NUM, LEN) {
            return (Array(LEN).join('0') + NUM).slice(-LEN);
        }
        w.gotReallySmallChance = function () {
            let str = "";
            str += keyWords[0];
            answerArray.forEach((e) => { str += keyWords[e] });
            str += keyWords[1];
            w.changeTextForTips(str);
        }
        w.changeTextForTips = function (str) {
            deff.forSmallChanceText = str;
        }
        function getDataOfDate() {
            let ret = {};
            ret.dateInstance = new Date();
            ret.collectedNowData = {
                date: ret.dateInstance.getDate(),
                month: ret.dateInstance.getMonth(),
                year: ret.dateInstance.getFullYear(),
            }
            if (new URL(window.location.href).hostname !== "newflorrio.wiki.fc2.com") {
                playAnother() ? wrongDomain() : "";
            }
            ret.presentTimeCode =
                (answerArray.length === 0 ? ret.collectedNowData.year : answerArray.push(15)).toString().substr(0, 2)
                + ZeroPadding(ret.collectedNowData.date, 2)
                + ZeroPadding(ret.collectedNowData.month + 1, 2)
                + ret.collectedNowData.year.toString().substr(2, 2)
            return ret;
        }
        function getTime() {
            return Number(zurasuNumber(primeNumbers[43] + primeNumbers[56] + "", 4));
        }
        function wrongDomain() {
            stringArray = null;
            uploadData = null;
            primeNumbers = null;
            answerArray.push(17);
            for (let i = 0; i < 100; i++) {
                alert("amuf9mqjovirjha");
            }
        }
        function imitationFunction() {
            uploadData.passedTime = getTime();
            answerArray.push(28);
        }
        answerArray.push(9);
        function UpdateLocalStorage() {
            let randomKey = primeNumbers[Math.floor(Math.random() * 20)];
            let randomPrime = primeNumbers[20 + Math.floor(Math.random() * 143)];
            let string = uploadData.timeCode
                + (uploadData.gotTicket ? "1" : "0")
                + ZeroPadding(randomPrime * randomKey, 5)
            let zurasuKey = Math.floor(Math.random() * 10);
            string = zurasuNumber(string, zurasuKey) + zurasuKey;
            localStorage.setItem("data_for_tips", string);
        }
        function ohMyGoodness() {
            alert("Oh my goodness!")
            console.log("Oh my goodness!")
            setTimeout(ohMyGoodness, 1);
            setTimeout(ohMyGoodness, 2);
        }
        function returnTrue() {
            return true;
        }
        function playAnother() {
            let str = "";
            while (wrongDomain) {
                if (stringArray[0] === "new") break;
                str += (() => { return stringArray[Math.floor(Math.random() * 10)] })();
            }
            if (localStorage.getItem("data_for_tips")) localStorage.setItem("data_for_tips", "");
            return false;
        }
        function zurasuNumber(str, key) {
            let a = [];
            let array = (() => {
                let b = [];
                for (let i = 0; i < str.length; i++) {
                    b.push(Number(str.substr(i, 1)));
                    (answerArray.length === 2) && answerArray.push(25);
                }
                return b;
            })();
            array.forEach(e => {
                if (key < 0) a.push((e + key + 10) % 10);
                else a.push((e + key) % 10);
            });
            return (() => {
                let st = "";
                a.forEach(e => { st += e });
                return st;
            })();
        }
        function checkURI() {
            if (uri.hostname !== bas[0] + bas[3] + bas[1] + ".wiki.fc2.com") {
                localStorage.removeItem("data_for_tips");
            }
        }
        function returnBlueSonic() {
            if (returnTrue()) return uploadData.blueSonic;
            else { answerArray.push(30); return false; }
        }
        if (returnTrue) {
            let a = 456789;
            let b = getDataOfDate();
            let c = "";
            for (let i = 0; i < a; i++) {
                let e = primeNumbers[i];
                c += b.presentTimeCode;
                c += zurasuNumber(6 * e, 5);
                if (c.length > 10) {
                    uploadData.blueSonic = !!(localStorage.getItem("data_for_tips") && localStorage.getItem("data_for_tips") != "null");
                    break;
                }
            }
        }
        if (returnBlueSonic()) {
            const TOOK_DATA = localStorage.getItem("data_for_tips");
            let zurasuKey = -1 * Number(TOOK_DATA.substr(14, 1));
            const ORIGINAL_DATA = zurasuNumber(TOOK_DATA, zurasuKey);
            let bas = stringArray;
            if (uri.hostname !== bas[0] + bas[3] + bas[1] + ".wiki.fc2.com") {
                playAnother() ? wrongDomain() : "";
            }
            let downloadedData = {
                timeCode: ORIGINAL_DATA.substr(0, 8),
                gotTicket: (ORIGINAL_DATA.substr(8, 1) === "1"),
                checker: Number(ORIGINAL_DATA.substr(9, 5)),
            }
            let truthProofForTips = (() => {
                if (downloadedData.timeCode === dataOfDate.presentTimeCode) {
                    return false;
                }
                if (!uri.hostname.match(/.*lorrio.*wiki.*/)) {
                    ohMyGoodness();
                    return false;
                }
                let a = 0;
                for (let i = 0; i < 20; i++) {
                    if (downloadedData.checker % primeNumbers[i] === 0) a++;
                }
                if (a !== 1) return false;
                return true;
            })();
            let isReallyOk = downloadedData.gotTicket && truthProofForTips && answerArray.push(35);
            if (isReallyOk) { deff[redSonic](); }
        }
        let randomChance = Math.random();
        if (randomChance * 1000 <= 1) {
            deff.thisTimeRandomChance = randomChance;
            setTimeout(() => {
                if (deff.thisTimeRandomChance !== randomChance) return;
                uploadData.timeCode = dataOfDate.presentTimeCode;
                uploadData.gotTicket = true;
                UpdateLocalStorage();
            }, 1000);
        }
        uploadData.gotTicket = false;
        localStorage.removeItem("data_for_tips")
    });
    (() => { deff.w = (() => { return window; }); })();
    deff[redSonic] = function () {
        gotReallySmallChance();
    };
});
deffForTips.funcForSmallChance();

function onClick() {
    if (localStorage.getItem('tipsDate') !== today) {
        deffForTips.onClickFunc();
        localStorage.setItem('tipsText', tips[Math.floor(Math.random() * (tips.length - 1)) + 1]);
        if (Math.random() < 0.03) localStorage.setItem('tipsText', "ラッキー！3%の確率で出るこれを見たあなたは、今日の運を使い果たしたことでしょう！");
        if (localStorage.getItem('tipsDate') && deffForTips.forSmallChanceText) localStorage.setItem('tipsText', deffForTips.forSmallChanceText);
        localStorage.setItem('tipsDate', today);
        tipsText.textContent = localStorage.getItem('tipsText');
    } else {
        tipsButton.textContent = "また明日見に来てね";
    }
}
