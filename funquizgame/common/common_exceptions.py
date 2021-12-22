from typing import List


class ValidationErrorField:
    def __init__(self, field: str, error: str):
        self.field: str = field
        self.error: str = error

    def __str__(self) -> str:
        return f'For {self.field}: encountered {self.error}'

    def json(self):
        return {
            'field': self.field,
            'error': self.error
        }


class ValidationException(Exception):
    def __init__(self, fields_errors: List[ValidationErrorField], additional_message=None):
        self.fields_errors: List[ValidationErrorField] = fields_errors
        self.additional_message = additional_message
        super().__init__(self.create_message())

    def create_message(self) -> str:
        if self.additional_message:
            return f'{self.additional_message} '.join(str(val) for val in self.fields_errors)
        else:
            return ''.join(str(val) for val in self.fields_errors)
    
    def fields_error_json(self)->List[dict]:
        return [erf.json() for erf in self.fields_errors]


class ValidationExceptionBuilder:
    def __init__(self):
        self.fields: List[ValidationErrorField] = []

    def add_empty_value_error(self, fieldname: str)->'ValidationExceptionBuilder':
        self.fields.append(ValidationErrorField(fieldname, 'Field should be entered'))
        return self

    def add_not_in_value_error(self, fieldname: str, min: int = None, max: int = None)->'ValidationExceptionBuilder':
        errormessage: str = ''
        if min is not None and max is not None:
            errormessage = f'value should be in between {min} and {max}'
        elif min is not None:
            errormessage = f'value should be greater than {min}'
        elif min is not None:
            errormessage = f'value should be less than {max}'
        else:
            errormessage = 'value should be a valid number'
        self.fields.append(ValidationErrorField(fieldname, errormessage))
        return self

    def build(self, additional_text=None)->ValidationException:
        return ValidationException(self.fields, additional_text)