function processarDados(e) {
  try {
    var pastaDestino = DriveApp.getFolderById("1Y9P98HZn7Il2_fUkqNFHT9hnLkR8GUo2");
    
    // Captura corrigida (e.response no singular)
    var itemResponses = e.response.getItemResponses();

    // Uso do getResponse() para capturar o texto
    var nome      = itemResponses[0].getResponse();
    var email     = itemResponses[1].getResponse();
    var dataNasc  = itemResponses[2].getResponse();
    var idsAnexos = itemResponses[3].getResponse(); 

    var linksFormatados = "";
    for (var i = 0; i < idsAnexos.length; i++) {
      var arquivo = DriveApp.getFileById(idsAnexos[i]);
      arquivo.setName("Anexo_" + nome + "_" + i);
      linksFormatados += "\n- Arquivo " + (i+1) + ": " + arquivo.getUrl();
    }

    var dataBrasilia = Utilities.formatDate(new Date(), "GMT-3", "dd-MM-yyyy_HH-mm");
    var nomeDoRelatorio = "Ficha_" + nome + "_" + dataBrasilia;

    var corpoTexto = "NOME: " + nome + "\nE-MAIL: " + email + "\nDATA: " + dataNasc + "\nANEXOS: " + linksFormatados + "\nProcessado em: " + dataBrasilia;;

    // Criando o arquivo
    pastaDestino.createFile(nomeDoRelatorio + ".txt", corpoTexto);
    Logger.log("Sucesso para: " + nome);

  } catch (erro) {
    Logger.log("ERRO: " + erro.toString());
  }
}