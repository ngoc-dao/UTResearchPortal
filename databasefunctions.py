# important imports
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi
from datetime import date

student_id = 1
faculty_id = 1
position_id = 1

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
    global student_id
    global faculty_id

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
                "_id": student_id
            }
            col.insert_one(student)
            student_id += 1
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
                "_id": faculty_id,
            }
            col.insert_one(faculty)
            faculty_id += 1
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

def addNewPosition(new_position):
    global position_id

    # connect to DB
    cert = certifi.where()
    load_dotenv()
    client = MongoClient(os.getenv('MONGO_CLIENT'), tlsCAFile=cert)
    db = client["ut-research-portal"]

    # obtain the faculty member
    fac_col = db["faculty"]
    query = {"eid": generateEncryption(new_position["eid"])}
    fac_doc = fac_col.find_one(query)
    faculty_name = "Dr. " + fac_doc["fname"] + " " + fac_doc["lname"]
    job_list = fac_doc["jobs"]

    # add position
    col = db["positions"]
    majors = new_position['majors']['optionSelected']
    majors_list = []
    for d in majors:
        majors_list.append(d['value'])
    new_position['majors'] = majors_list
    new_position["faculty_member"] = faculty_name
    new_position["date_posted"] = date.today().strftime("%B %d, %Y")
    new_position["_id"] = position_id
    col.insert_one(new_position)
    job_id = position_id
    position_id += 1

    # update the faculty to add new job
    job_list.append(job_id)
    new_tot = {'$set' : {'jobs' : job_list}}
    fac_col.update_one(query, new_tot)

    # return success
    return {
        "error" : False,
    }
    

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