export function totalPages(totalItems: number, itemsPerPage: number) {
    return Math.ceil(totalItems / itemsPerPage)
}

export function getPageIndexes(PaginationButtonNumber: number, itemsPerPage: number) {
    const endIndex = PaginationButtonNumber * itemsPerPage
    const startIndex = endIndex - itemsPerPage

    return {
        startIndex,
        endIndex
    }
}