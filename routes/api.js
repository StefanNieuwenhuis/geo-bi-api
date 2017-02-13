const express = require('express');
const router = express.Router();
const axios = require('axios');
const API = 'http://services.arcgisonline.nl/arcgis/rest/services/Demografie/CBS_WijkenBuurten_2011/MapServer/2/query/';

const outFields = 'objectid, gm_code, gm_naam, aant_inw, oad, bev_dichth, aantal_hh, p_elek_tot, p_gas_tot';

router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/towns', (req, res) => {

    axios.get(`${API}`, {
        params: {
            f: 'pjson',
            where: '1=1',
            outFields: outFields,
            orderByFields: 'gm_naam',
            returnGeometry: false
        }
    })
        .then(towns => res.status(200).json(towns.data.features))
        .catch(error => res.status(500).send(error));

});

router.get('/towns/:id', (req, res) => {
    axios.get(`${API}`, {
        params: {
            f: 'pjson',
            where: `objectid = ${req.params.id}`,
            outFields: 'objectid, gm_code, gm_naam, aant_inw, oad, bev_dichth, aantal_hh, p_elek_tot, p_gas_tot',
            orderByFields: 'gm_naam',
            returnGeometry: false
        }
    })
        .then(towns => res.status(200).json(towns.data.features))
        .catch(error => res.status(500).send(error));
});

router.get('/towns/geo/:point', (req, res) => {
    axios.get(`${API}`, {
        params: {
            f: 'pjson',
            where: '1=1',
            geometry: req.params.point,
			geometryType: 'esriGeometryPoint',
            outFields: 'objectid, gm_code, gm_naam, aant_inw, oad, bev_dichth, aantal_hh, p_elek_tot, p_gas_tot',
            orderByFields: 'gm_naam',
            returnGeometry: false
        }
    })
        .then(towns => res.status(200).json(towns.data.features))
        .catch(error => res.status(500).send(error));
});

module.exports = router;