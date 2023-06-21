export const removeDuplicates = (arr: any[], filter: string | number) => {
  let uniqueElements: any[] = [];
  // eslint-disable-next-line array-callback-return
  arr.filter((element: any) => {
    const isDuplicate = uniqueElements.some(
      (uniqueElement) => uniqueElement[filter] === element[filter]
    );

    if (!isDuplicate) {
      uniqueElements.push(element);

      return true;
    }
  });
  return uniqueElements;
};
