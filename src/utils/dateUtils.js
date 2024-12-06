// 날짜 형식을 'yyyy-MM-dd'로 변환하는 함수
export const toLocalDateFormat = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0]; // ISO 형식에서 'yyyy-MM-dd' 부분만 추출
};
