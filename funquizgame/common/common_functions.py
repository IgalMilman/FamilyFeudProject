import random
import string

def is_blank(value:str)->bool:
    return value is None or isinstance(value, str) and not value and not value.strip()

def generate_access_code(length:int=6)->str:
    return ''.join(random.choices(string.digits, k=length))