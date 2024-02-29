const db = require('../config/database');
const sql = require('mssql')

const registerVotes = async (req, res) => {
  try {
    const body = req.body;

    if (!body.jrv || !body.tipo_conteo) {
      return res.status(400).json({ message: 'JRV and conteo type are required' });
    }

    const request = await db.request();
    request.input('JRV', sql.Int, body.jrv);
    request.input('TIPO_CONTEO', sql.Int, body.tipo_conteo);
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
    request.input('FALTANTES', sql.Int, body.faltantes);
    request.input('SOBRANTES', sql.Int, body.sobrantes);
    request.input('INUTILIZADAS', sql.Int, body.inutilizadas);
    request.input('ENTREGADAS_VOTANTES', sql.Int, body.entregadas_votantes);
    request.input('TOTAL_PAPELETAS', sql.Int, body.total_papeletas);

    await request.execute('REGISTRAR_VOTOS');

    return res.status(200).json({ message: 'Votes registered successfully' });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error registering votes' });
  }
}

const getJrvInfo = async (req, res) => {
  try {
    const { jrv, tipo_conteo} = req.query;

    if (!jrv || !tipo_conteo) {
      return res.status(400).json({ message: 'JRV and conteo type are required' });
    }

    const request = await db.request();
    request.input('JRV', sql.Int, jrv);
    request.input('TIPO_CONTEO', sql.Int, tipo_conteo);

    const result = await request.execute('OBTENER_INFO_JRV');

    if (result.returnValue === 404) {
      return res.status(404).json({ message: 'JRV not found' });
    }

    if (result.returnValue === 200) {
      return res.status(200).json({ 
        jrv: result.recordsets[0][0],
        conteo: result.recordsets[1]?.[0]
       });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error getting JRV info' });
  }
}

module.exports = {  
  registerVotes,
  getJrvInfo
};