// models/Project.js

class Project {
    constructor(id, nome, dataInicio, gerenteId) {
      this.id = id;
      this.nome = nome;
      this.dataInicio = dataInicio;
      this.gerenteId = gerenteId;
    }
  
    // Métodos adicionais conforme necessário
  
    static fromDatabase(data) {
      return new Project(
        data.id,
        data.nome,
        data.dataInicio,
        data.gerenteId
      );
    }
  }
  
  module.exports = Project;
  