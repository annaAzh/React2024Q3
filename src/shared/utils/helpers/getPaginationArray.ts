import { PAGINATION_SIZE } from 'shared/constants';
import { getRangeArray } from './getRangeArray';

const getPaginationArray = (totalPage: number, page: number, siblings: number) => {
  const totalPageNoInArray = PAGINATION_SIZE + siblings;

  const firstPageIndex = 1;
  const lastPageIndex = totalPage;
  const indexShift = 1;

  if (totalPageNoInArray >= totalPage) {
    return getRangeArray(firstPageIndex, totalPage + indexShift);
  }

  const leftSiblingsIndex = Math.max(page - siblings, firstPageIndex);
  const rightSiblingsIndex = Math.min(page + siblings, totalPage);

  const showLeftDots = leftSiblingsIndex > firstPageIndex + indexShift;
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = getRangeArray(firstPageIndex, leftItemCount + indexShift);
    return [...leftRange, '...', lastPageIndex];
  } else if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = getRangeArray(totalPage - rightItemCount + indexShift, totalPage + indexShift);
    return [firstPageIndex, '...', ...rightRange];
  } else if (showLeftDots && showRightDots) {
    const middleRange = getRangeArray(leftSiblingsIndex, rightSiblingsIndex + indexShift);
    if (leftSiblingsIndex === firstPageIndex + indexShift) {
      return [firstPageIndex, ...middleRange, '...', lastPageIndex];
    }
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  } else {
    return getRangeArray(firstPageIndex, totalPage + indexShift);
  }
};

export { getPaginationArray };
