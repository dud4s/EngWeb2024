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
            data = file.readlines()
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
    new_data = {"filmes": [], "atores": [], "generos": []}
    ator_counter = 1
    genero_counter = 1
    row = 0
    for d in data:
        d = json.loads(d)

        if "cast" in d:
            for actor in d['cast']:
                if not exists(actor, new_data["atores"]):
                    new_data["atores"].append({
                        "id": f"a{ator_counter}",
                        "nome": actor
                    })
                ator_counter += 1
        else:
            d["cast"] = []
        if "genres" in d:
            for genre in d['genres']:
                if not exists(genre, new_data["generos"]):
                    new_data["generos"].append({
                        "id": f"g{genero_counter}",
                        "nome": genre
                    })
                genero_counter += 1
        else:
            d["genres"] = []
    
        new_data["filmes"].append({
            "id": d["_id"]["$oid"],
            "titulo": d["title"],
            "ano": d["year"],
            "generos": [g["id"] for g in new_data["generos"] if g["nome"] in d["genres"]],
            "atores": [a["id"] for a in new_data["atores"] if a["nome"] in d["cast"]]
        })

        row += 1
        if row % 5000 == 0:
            print(f"Processing row {row}...")

    return new_data

def write_json(data, file_path):
    with open(file_path, 'w') as file:
        file.write(json.dumps(data, indent=2))
        print(f"File {file_path} created!")

data = read_file(SOURCE_PATH)
data = fix_data(data)
write_json(data, DEST_PATH)