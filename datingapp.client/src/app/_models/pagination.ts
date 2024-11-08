export interface Pagination {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

export class PaginatedResult<T> {
    result?: T;         //to store users or messages etc
    pagination?: Pagination;
}
