import { NodeRuntime } from "inspector";

export interface MetaData{
    currentPage: number;
    totalPages:number;
    pageSize: number;
    totalCount: number;
}
export class PaginateResponse<T> {
    item: T;
    metaData: MetaData;


    constructor(items: T, metaData:MetaData){
        this.item = items;
        this.metaData= metaData;
    }
}