import sys
import json

if len(sys.argv) != 3:
    print("Usage: python script.py <source_path> <dest_path>")
    exit(1)

# read args
SOURCE_PATH = sys.argv[1]
DEST_PATH = sys.argv[2]

# read json file
def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"File {file_path} not found!")
        exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        exit(1)

def exists(d, l):
    for i in l:
        if i["nome"] == d:
            return True
    return False

def fix_data(data):
    new_data = {"compositores": data["compositores"], "periodos": []}

    perido_counter = 1
    for d in data["compositores"]:
        print(d)
        if "periodo" not in d:
            d["periodo"] = "Unknown"

        if not exists(d["periodo"], new_data["periodos"]):
            new_data["periodos"].append({
                "id": f"p{perido_counter}",
                "nome": d["periodo"]
            })
            perido_counter += 1
    return new_data

def write_json(data, file_path):
    with open(file_path, 'w') as file:
        file.write(json.dumps(data, indent=2))
        print(f"File {file_path} created!")

data = read_file(SOURCE_PATH)
data = fix_data(data)
write_json(data, DEST_PATH)