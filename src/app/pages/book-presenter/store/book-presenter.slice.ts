export interface BookPresenterSlice {
    readonly selectedBookId: number,
}

export const initialBookPresenterSlice: BookPresenterSlice = {
    selectedBookId: 0,
}