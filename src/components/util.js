//Change number to persian
export function toPersianNumber(num) {
    return num.toString().replace(/[0-9]/g, d =>
        "۰۱۲۳۴۵۶۷۸۹" [d]
    );
};