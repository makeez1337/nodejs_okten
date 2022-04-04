export interface IPaginationResponce<T> {
    page: number;
    perPage: number;
    itemsCount: number;
    data: T[];
}
