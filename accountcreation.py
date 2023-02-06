from email_validator import validate_email, EmailNotValidError

def verifyNewAccount(account):
    return verifyName(account['first']) and verifyName(account['last']) and verifyEmail(account['email']) and verifyEID(account['eid']) and verifyPassword(account['password'])

def verifyName(name):
    for c in name:
        if not c.isalpha():
            return False
    return True

def verifyEmail(email):
    try:
        v = validate_email(email)
        email = v["email"]
        return True
    except EmailNotValidError as e:
        return False 

def verifyEID(eid):
    # TODO - verify a correct EID
    return True

def verifyPassword(password):
    # TODO - maybe have password requirements?
    return True