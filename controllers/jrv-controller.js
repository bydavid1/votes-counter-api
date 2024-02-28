const db = require('../config/database');
const sql = require('mssql')

const registerVotes = async (req, res) => {
  const body = req.body;

  const request = await db.request();
  request.input('JRV', sql.Int, body.jrv);
  request.input('TIPO_CONTEO', sql.VarChar, body.tipo_conteo);
  request.input('ARENA', sql.Int, body.arena);
  request.input('FMLN', sql.Int, body.fmln);
  request.input('NUEVAS_IDEAS', sql.Int, body.nuevas_ideas);
  request.input('GANA', sql.Int, body.gana);
  request.input('PCN', sql.Int, body.pcn);
  request.input('PDC', sql.Int, body.pdc);
  request.input('VAMOS', sql.Int, body.vamos);
  request.input('CD', sql.Int, body.cd);
  request.input('NUESTRO_TIEMPO', sql.Int, body.nuestro_tiempo);
  request.input('FUERZA_SOLIDARIA' , sql.Int, body.fuerza_solidaria);
  request.input('FPS', sql.Int, body.fps);
  request.input('NULOS', sql.Int, body.nulos);
  request.input('IMPUGNADOS', sql.Int, body.impugnados);
  request.input('ABSTENCIONES', sql.Int, body.abstenciones);
  request.input('TOTAL_PAPELETAS', sql.Int, body.total_papeletas);

  request.execute('REGISTRAR_VOTOS', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error registering votes', error: err });
      return;
    }
    res.json({ message: 'Votes registered successfully' });
  });
}

const getJrvInfo = async (req, res) => {
  const jrv = req.query.jrv;
  const request = await db.request();
  request.input('JRV', sql.Int, jrv);

  request.execute('OBTENER_INFO_JRV', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error getting JRV info', error: err });
      return;
    }

    res.json({data: result.recordset[0]});
  });
}

module.exports = {  
  registerVotes,
  getJrvInfo
};