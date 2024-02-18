
import os
import xml.etree.ElementTree as ET

def convert_para_to_text(para_element):
    para_element.tag = 'p'
    for child in para_element:
        if child.tag == 'para':
            convert_para_to_text(child)
        else:
            child.tag = 'b'
    return ET.tostring(para_element, encoding='unicode', method='html')

##################################### FIGURA CLASS #####################################
class Figura:
    def __init__(self, figura_element):
        self.imagem = figura_element.find('imagem').attrib['path']
        self.legenda = get_element_text(figura_element.find('legenda'))

    def to_html(self):
        path = os.path.abspath(__file__)
        path = path.replace('classes.py', f'MapaRuas-materialBase/texto/{self.imagem}')
        return f"""
        <figure>
            <img src={path} alt="{self.legenda}">
            <center>
            <figcaption>{self.legenda}</figcaption>
            </center>
        </figure>
        """

##################################### RUA CLASS #####################################
class Rua:
    def __init__(self, rua_element):
        self.numero = ''
        self.nome = ''
        self.casas = []
        self.figuras = []
        if rua_element is not None:
            meta = rua_element.find('meta')
            if meta is not None:
                self.numero = get_element_text(meta.find('número'))
                self.nome = get_element_text(meta.find('nome'))
            
            corpo = rua_element.find('corpo')
            if corpo is not None:
                self.figuras = [Figura(figura) for figura in corpo.findall('figura')]

                lista_casas_element = corpo.find('lista-casas')
                if lista_casas_element is not None:
                    self.casas = [House(house) for house in lista_casas_element.findall('casa')]

                self.paragrafos = [convert_para_to_text(para) for para in corpo.findall('para')]

    def create_html_file(self, html_path):
        if not os.path.exists('HTMLpages'):
            os.makedirs('HTMLpages')

        with open(html_path, 'w') as file:
            content = f"""
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>{self.nome}</title>
                    <style>
                        figure {{
                            margin: 0;
                            padding: 0;
                            width: 100vw;
                        }}
                        figure img {{
                            max-width: 100%;
                            height: auto;
                            display: block;
                        }}
                    </style>
                </head>
                <body>
                    <h1>{self.nome}</h1>
                    {''.join([str(para) for para in self.paragrafos])}
                    {''.join([figura.to_html() for figura in self.figuras])}

                    {''.join([casa.to_html() for casa in self.casas])}
                    <center>
                    <span>[</span><a href="../index.html">Voltar ao índice</a><span>]</span>
                    </center>
                </body>
            </html>
            """
            file.write(content)

##################################### DESC CLASS #####################################
class Desc:
    def __init__(self, desc_element):
        self.desc = convert_para_to_text(desc_element)

    def __str__(self):
        return self.desc

##################################### HOUSE CLASS #####################################
class House:
    def __init__(self, house_element):
        if house_element is not None:
            self.numero = get_element_text(house_element.find('número'))
            self.enfiteuta = get_element_text(house_element.find('enfiteuta'))
            self.foro = get_element_text(house_element.find('foro'))
            self.vista = get_element_text(house_element.find('vista'))
            self.desc = Desc(house_element.find('desc')) if house_element.find('desc') is not None else None

    def to_html(self):
        return f"""
        <div>
            <h2>Casa número {self.numero}</h2>
            <p><b>Enfiteuta:</b> {self.enfiteuta if self.enfiteuta is not None else "N/A"}</p>
            <p><b>Foro:</b> {self.foro if self.foro is not None else "N/A"}</p>
            <p><b>Vista:</b> {self.vista if self.vista is not None else "N/A"}</p>
            <p><b>Descrição:</b> {self.desc if self.desc is not None else "N/A"}</p>
            <center>
                <hr width="80%"/>
            </center>
        </div>
        """

def get_element_text(element):
    return element.text if element is not None else None