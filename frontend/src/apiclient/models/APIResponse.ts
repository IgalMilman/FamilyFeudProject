class FieldError{
    field: string;
    error: string;
}

export class APIResponse<T>{
    status: number;
    error?: string;
    fields_error?: FieldError[];
    data: T;
}