from pwdlib import PasswordHash

pass_hash=PasswordHash()

def hash_password(password:str):
    "This function takes the user's actual password and converts it into a hash."
    return pass_hash(password)

def verify_password(password:str,hash_password:str):
    "Return True if password verified"

    return pass_hash.verify(password,hash_password)
