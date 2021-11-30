var Employment_wagesModel = require('../models/employment_wagesModel.js');
var options = {
	page: 1,
	limit: 10,
	select: ['fields.area_title',
		'fields.industry_code',  
		'fields.industry_title', 
		'fields.total_qtrly_wages', 
		'fields.avg_wkly_wage'
	],	
	sort: {  _id: -1 },
    useEstimatedCount: true
};

/**
 * employment_wagesController.js
 *
 * @description :: Server-side logic for managing employment_wagess.
 */
module.exports = {

    /**
     * Renderiza la vista index con toda los documentos de 
     * employment_wages
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    list: function (req, res) {
		if (req.query) {
			if (req.query.page) options.page = req.query.page;
			if (req.query.limit) options.limit = req.query.limit;
		}
		Employment_wagesModel.paginate({}, options)		
		.then(data => {
			let list = data.docs;
			const title = "Proyecto Primer Parcial - Map Reduce";
			const group = "Grupo #3: Evelyn Mejia, George Henriquez y Jeffrey Prado";
			const infoPage = { actual: data.page, hasPrev: data.hasPrevPage, 
				hasNext: data.hasNextPage, pages: data.totalPages, docs: data.totalDocs };
			res.render('index', { list: list, infoPage: infoPage,  
				title: title, group: group 
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message || "Some error occurred while retrieving employments."})
		});		
	},


    /**
     * Busca un documento(employment_wages) por el id de 
     * y renderiza la vista detail con la data encontrada
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    show: function (req, res) {
        var id = req.params.id;
        Employment_wagesModel.findOne({_id: id}, function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting employment_wages.',
                    error: err
                });
            }

            if (!employment_wages) {
                return res.status(404).json({
                    message: 'No such employment_wages'
                });
            }
			res.render('detail', { data: employment_wages, title: 'Detail' });
        });
    },


    /**
     * Crea un nuevo documento basado en el modelo Employment_wagesModel, 
     * lo almacena en la base y redirige a vista principal
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    create: function (req, res) {
        var employment_wages = new Employment_wagesModel({
			fields: {
				area_title : req.body.area_title,			
				industry_code : req.body.industry_code,
				industry_title : req.body.industry_title,
				total_qtrly_wages : req.body.total_qtrly_wages,
				avg_wkly_wage : req.body.avg_wkly_wage,
				period : req.body.period,
				month1_emplvl : req.body.month1_emplvl,
			}
		});
        employment_wages.save(function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating employment_wages',
                    error: err
                });
            } else 
				res.redirect("/employment");
        });
    },

    /**
     * Busca un documento de  employment_wages por su id, lo actualiza en 
     * base a los parámetros recibidos en el http request y redirige a la 
     * vista principal
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    update: function (req, res) {
        var id = req.params.id;
        

        Employment_wagesModel.findOne({_id: id}, function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting employment_wages',
                    error: err
                });
            }

            if (!employment_wages) {
                return res.status(404).json({
                    message: 'No such employment_wages'
                });
            }
            
            Object.assign(employment_wages.fields, req.body);
            employment_wages.save(function (err, employment_wages) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating employment_wages.',
                        error: err
                    });
                } else {
                    res.redirect("/employment");
                }
            });
        });
    },

    /**
     *  Elimina el documento que coincide con id enviado como párametro 
     *  y redirige a la vista principal
     * 
     * @param {*} req http request
     * @param {*} res http response
     */
    remove: function (req, res) {
        var id = req.params.id;

        Employment_wagesModel.findByIdAndRemove(id, function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the employment_wages.',
                    error: err
                });
            }else {
				res.redirect("/employment");
			}
        });
    }
};
