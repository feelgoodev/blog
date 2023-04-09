export default function FormatDate(timeStamp:number) {
    const dateInFormat = new Date(timeStamp);
    return dateInFormat.toLocaleString('ko-KR', { timeZone: 'UTC' });
}
