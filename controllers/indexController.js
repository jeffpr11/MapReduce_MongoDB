const fs = require('fs');

module.exports = {
    /**
     * Lee al archivo json generado con los resultados del mapReduce 
     * y renderiza la vista map_reduce con los datos leídos.
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    mapReduce: function (req, res) {
        const limit =  10;
        let page = 1;
        if (req.query.page) page = req.query.page;
        
        fs.readFile('public/data/reduced.json', (err, data) => {
            if (err) console.log(err);

            let employment_wages = JSON.parse(data);
            let keys = Object.keys(employment_wages);

            let hasNext = keys[page+1] ? true : false;
            let hasPrev = keys[page-1] ? true : false;

            const infoPage = { actual: parseInt(page), hasPrev: hasPrev, 
            hasNext: hasNext, pages: Math.floor(keys.length/limit), docs: keys.length };

            let sliced_keys = keys.slice((page - 1) * limit + 1, page * limit + 1);

            res.render('map_reduce', { title: 'Map Reduce', data: employment_wages, 
            keys: sliced_keys, infoPage: infoPage, limit: limit });
        });
    }
}