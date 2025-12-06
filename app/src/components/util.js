//Change number to persian
export function toPersianNumber(num) {
    return num.toString().replace(/[0-9]/g, d =>
        "۰۱۲۳۴۵۶۷۸۹" [d]
    );
};
export function persianToEnglishNumber(persianStr) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits  = "٠١٢٣٤٥٦٧٨٩";

  const result = persianStr
    .split("")
    .map(char => {
      if (persianDigits.includes(char)) {
        return persianDigits.indexOf(char);
      }
      if (arabicDigits.includes(char)) {
        return arabicDigits.indexOf(char);
      }
      return char;
    })
    .join("");

  return parseInt(result, 10);
}
