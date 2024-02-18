
import xml.etree.ElementTree as ET
import os
import classes

# XML FILES DIRECTORY
XML_DIR = "MapaRuas-materialBase/texto"

if not os.path.exists(XML_DIR):
    print(f"Directory {XML_DIR} does not exist!")
    exit(1)


index_content = ""

for filename in os.listdir(XML_DIR):
    if filename.endswith(".xml"):
        file_path = os.path.join(XML_DIR, filename)

        tree = ET.parse(file_path)
        root = tree.getroot()

        rua = classes.Rua(root)
        html_path = 'HTMLpages/' + filename.replace('.xml', '.html')
        index_content += f"""<li><a href="{html_path}">{rua.nome}</a></li>"""
        rua.create_html_file(html_path)

html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Mapa Virtual </title>
</head>
<body>
    <h1> Mapa Virtual </h1>
    <a name="indice"><h2>Índice</h2></a>
    <ol>
        {index_content}
    </ol>
</body>
</html>
"""

with open("index.html", "w") as file:
    file.write(html_content)

print("HTML File created successfully!")