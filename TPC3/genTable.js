function genFilmes(data) {
  let pagHTML = `
    <html>
    <head>
        <title>Filmes</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>Lista de Filmes</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
            <th>Identificador</th>
            <th>Título</th>
            <th>Ano</th>
            <th>Géneros</th>
            <th>Elenco</th>
            </tr>`;

  for (let i = 0; i < data.length; i++) {
    pagHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].titulo}</td>
            <td>${data[i].ano}</td>
            <td> <span>`;
    for (let j = 0; j < data[i].generos.length; j++) {
      pagHTML += `<a href='/generos?id=${data[i].generos[j]}'><span class="w3-tag w3-teal">${data[i].generos[j]}</span></a> `;
    }
    pagHTML += `</span></td> <td> <span>`;

    for (let j = 0; j < data[i].atores.length; j++) {
      pagHTML += `<a href='/atores?id=${data[i].atores[j]}'><span class="w3-tag w3-teal">${data[i].atores[j]}</span></a> `;
    }
    pagHTML += `</span></td></tr>`;
  }
  pagHTML += `
        </table>
    </body>
    </html>
    `;
  return pagHTML;
}

function genGeneros(data) {
  let pagHTML = `
    <html>
    <head>
        <title>Géneros</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>Lista de Géneros</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
            <th>Identificador</th>
            <th>Género</th>
            </tr>`;

  for (let i = 0; i < data.length; i++) {
    pagHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].nome}</td>
        </tr>
    `;
  }
  pagHTML += `
        </table>
    </body>
    </html>
    `;
  return pagHTML;
}

function genAtores(data) {
  let pagHTML = `
    <html>
    <head>
        <title>Atores</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>Lista de Atores</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
            <th>Identificador</th>
            <th>Nome</th>
            </tr>`;

  for (let i = 0; i < data.length; i++) {
    pagHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td><center>${data[i].nome}</center></td>
        </tr>
    `;
  }
  pagHTML += `
        </table>
    </body>
    </html>
    `;
  return pagHTML;
}

module.exports = { genFilmes, genGeneros, genAtores };
