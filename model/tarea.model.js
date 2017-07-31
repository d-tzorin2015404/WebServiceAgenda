var database = require("../config/database.config");
var Tarea = {};

Tarea.select = function(idUsuario, callback) {
  if(database) {
		database.query('CALL sp_selectTareas(?)', idUsuario,
     function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados[0]);
			}
		});
	}
}

Tarea.insert = function(data, callback) {
  if(database) {
    database.query('CALL sp_tareaInsert(?,?,?,?,?,?)',
    [data.idUsuario, data.nombre, data.apellido, data.telefono, data.direccion, data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

Tarea.update = function(data, callback){
	if(database) {
		database.query('CALL sp_updateTarea(?,?,?,?,?,?)',
		[data.idTarea, data.nombre, data.apellido, data.telefono, data.direccion, data.idCategoria],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

Tarea.delete = function(idTarea, callback) {
	if(database) {
		database.query('CALL sp_deleteTarea(?)', idTarea,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Tarea;
