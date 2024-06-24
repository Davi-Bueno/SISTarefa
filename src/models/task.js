// src/models/Task.js

class Task {
    constructor(id, dataCriacao, dataModificacao, dataInicio, dataTermino, projetoId, responsavelId, descricao, concluida) {
      this.id = id;
      this.dataCriacao = dataCriacao;
      this.dataModificacao = dataModificacao;
      this.dataInicio = dataInicio;
      this.dataTermino = dataTermino;
      this.projetoId = projetoId;
      this.responsavelId = responsavelId;
      this.descricao = descricao;
      this.concluida = concluida;
    }
  
    // Métodos adicionais conforme necessário
  
    static fromDatabase(data) {
      // Método estático para criar uma instância de Task a partir de dados do banco
      return new Task(
        data.id,
        data.dataCriacao,
        data.dataModificacao,
        data.dataInicio,
        data.dataTermino,
        data.projetoId,
        data.responsavelId,
        data.descricao,
        data.concluida
      );
    }
  
    // Outros métodos úteis para operações relacionadas a tarefas
  }
  
  module.exports = Task;
  