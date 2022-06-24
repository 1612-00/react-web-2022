export const formatNumber = (num) => {
    var arrayNum = num.toString(10).split("");
    var strNum = "";
    arrayNum.map((n, i) => {
        if ((arrayNum.length - 1 - i) % 3 === 0 && i !== arrayNum.length - 1)
            strNum += n + ",";
        else strNum += n;
    });

    return strNum;
};
