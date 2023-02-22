# important imports
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

def tryLogin(user, isStudent):
    eid = user["eid"]
    password = user["password"]
    eid_encrypt = generateEncryption(eid)
    password_encrypt = generateEncryption(password)

    cert = certifi.where()
    load_dotenv()
    client = MongoClient(os.getenv('MONGO_CLIENT'), tlsCAFile=cert)

    db = client["ut-research-portal"]
    col = None
    if (isStudent == True):
        col = db["students"]
    else:
        col = db["faculty"]
    query = {"eid" : eid_encrypt}
    doc = col.find_one(query)

    if (doc == None):
        return {
            "error" : True,
            "message" : "There is no account tied to this EID. Please try again.",
        }
    if (doc["password"] != password_encrypt):
        return {
            "error" : True,
            "message" : "The given password is incorrect. Please try again.",
        }
    return {
        "error" : False,
    }


def storeNewAccountInDB(account):
    eid = account["eid"]
    password = account["password"]
    eid_encrypt = generateEncryption(eid)
    password_encrypt = generateEncryption(password)

    cert = certifi.where()
    load_dotenv()
    client = MongoClient(os.getenv('MONGO_CLIENT'), tlsCAFile=cert)

    db = client["ut-research-portal"]
    if (account["usertype"] == "Student"):
        col = db["students"]
        query = {"eid" : eid_encrypt}
        doc = col.find_one(query)

        if (doc == None):
            student = {
                "fname" : account["first"],
                "lname" : account["last"],
                "email" : account["email"],
                "eid" : eid_encrypt,
                "password" : password_encrypt,
                "applications" : {},
            }
            col.insert_one(student)
            return {
                "error" : False,
            }
        else:
            if (doc["password"] == password_encrypt):
                return {
                    "error" : True,
                    "message" : "You have an existing account. Please sign in with your EID and password."
                }
            else:
                return {
                    "error" : True,
                    "message" : "There is an account tied to this EID."
                }
    else:
        col = db["faculty"]
        query = {"eid" : eid_encrypt}
        doc = col.find_one(query)

        if (doc == None):
            faculty = {
                "fname" : account["first"],
                "lname" : account["last"],
                "email" : account["email"],
                "eid" : eid_encrypt,
                "password" : password_encrypt,
                "jobs" : {},
            }
            col.insert_one(faculty)
            return {
                "error" : False,
            }
        else:
            if (doc["password"] == password_encrypt):
                return {
                    "error" : True,
                    "message" : "You have an existing account. Please sign in with your EID and password."
                }
            else:
                return {
                    "error" : True,
                    "message" : "There is an account tied to this EID."
                }
            
def getPositions():
    # connect to DB
    cert = certifi.where()
    load_dotenv()
    client = MongoClient(os.getenv('MONGO_CLIENT'), tlsCAFile=cert)
    db = client["ut-research-portal"]
    col = db["positions"]

    # return all positions
    positions = []
    for doc in col.find():
        positions.append(doc)
    return positions
    

# encrypt EID and password when storing in database
def generateEncryption(inputText):
    encryptedText = list(inputText)
    encryptedText.reverse()
    load_dotenv()
    
    index = 0
    for ch in encryptedText:
        currASCII = ord(ch)
        times = 0
        if (int(os.getenv("ENCRYPTION_DIRECTION")) < 0):
            while (times < int(os.getenv("ENCRYPTION_NUM_POSITIONS"))):
                currASCII -= 1
                if (currASCII < 34):
                    currASCII = 126
                times += 1
        else:
            while (times < int(os.getenv("ENCRYPTION_NUM_POSITIONS"))):
                currASCII += 1
                if (currASCII > 126):
                    currASCII = 34
                times += 1

        encryptedText[index] = chr(currASCII)
        index += 1
    return "".join(encryptedText)