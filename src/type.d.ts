declare namespace Global {
    type ApiResult<D> = {
        code: number
        message: string
        data: D
    }
}