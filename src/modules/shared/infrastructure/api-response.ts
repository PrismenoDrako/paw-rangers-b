
export class ApiResponseDto<T> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    errors?: any;
    meta?: any;          // información adicional opcional
    timestamp?: string;  // opcional

    constructor(partial: Partial<ApiResponseDto<T>>) {
        Object.assign(this, partial);
        this.timestamp ??= new Date().toISOString();
    }
}