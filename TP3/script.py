import os
import csv
import json

# CSV FILE PATH
SOURCE_PATH = 'Health_AnimalBites.csv'
DESTINATION_PATH = 'db.json'

# 0 - bite_date
# 1 - SpeciesIDDesc
# 2 - BreedIDDesc
# 3 - GenderIDDesc
# 4 - color
# 5 - vaccination_yrs
# 6 - vaccination_date
# 7 - victim_zip
# 8 - AdvIssuedYNDesc
# 9 - WhereBittenIDDesc
# 10 - quarantine_date
# 11 - DispositionIDDesc
# 12 - head_sent_date
# 13 - release_date
# 14 - ResultsIDDesc

# read csv file
def read_csv(file_path):
    try:
        with open(file_path, newline='', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file, delimiter=';')
            data = [row for row in csv_reader]
            return data
    except FileNotFoundError:
        print(f"File {file_path} not found!")
        exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        exit(1)

def exists(d, data):
    for i in data:
        if i["designation"] == d:
            return True
    return False

def calc_breeds(data):
    breeds = []
    counter = 1
    for d in data:
        if not exists(d["BreedIDDesc"], breeds) and d["BreedIDDesc"] != "":
            breeds.append({
                "id": f"e{counter}",
                "designation": d["BreedIDDesc"]
            }
            )
            counter += 1

    return breeds   

def calc_animals(data):
    animals = []
    counter = 1
    for d in data:
        if not exists(d["SpeciesIDDesc"], animals) and d["SpeciesIDDesc"] != "":
            animals.append({
                "id": f"e{counter}",
                "designation": d["SpeciesIDDesc"]
            }
            )
            counter += 1

    return animals

# write json file
def write_json(data, file_path):
    with open(file_path, 'w') as file:
        file.write(json.dumps(data, indent=2))


data = read_csv(SOURCE_PATH)
db = {
    "bites": data,
    "breeds": calc_breeds(data),
    "animals": calc_animals(data),
}

write_json(db, DESTINATION_PATH)
print("YEY! JSON file created successfully!")