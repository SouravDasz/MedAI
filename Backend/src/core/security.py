from pwdlib import PasswordHash

pass_hash=PasswordHash.recommended()

def hash_password(password:str):
    "This function takes the user's actual password and converts it into a hash."
    return pass_hash.hash(password)

def verify_password(password:str,hash_password:str):
    "Return True if password verified"

    return pass_hash.verify(password,hash_password)
