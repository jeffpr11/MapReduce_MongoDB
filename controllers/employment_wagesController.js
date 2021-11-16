var Employment_wagesModel = require('../models/employment_wagesModel.js');
var options = {
	page: 1,
	limit: 10,
	select: ['fields.area_title',
		'fields.industry_code',  
		'fields.industry_title', 
		'fields.total_qtrly_wages', 
		'fields.avg_wkly_wage',
		'fields.month1_emplvl',
		'fields.period',
	]	
};

/**
 * employment_wagesController.js
 *
 * @description :: Server-side logic for managing employment_wagess.
 */
module.exports = {

	/**
     * employment_wagesController.list()
     */
    list: function (req, res) {
		if (req.query) {
			if (req.query.page) options.page = req.query.page;
			if (req.query.limit) options.limit = req.query.limit;
		}
		Employment_wagesModel.paginate({}, options)
		.then(data => {
			res.send({
				currentPage: data.page,
				totalPages: data.totalPages,
				totalRows: data.totalDocs,
				hasPrev: data.hasPrevPage,
				prev: data.prevPage,
				hasNext: data.hasNextPage,
				next: data.nextPage,
				data
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message || "Some error occurred while retrieving employments."})
		});		
	},

    /**
     * employment_wagesController.show()
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

            return res.json(employment_wages);
        });
    },

    /**
     * employment_wagesController.create()
     */
    create: function (req, res) {
        var employment_wages = new Employment_wagesModel({
			fields: {
				area_title : req.body.fields.area_title,			
				industry_code : req.body.fields.industry_code,
				industry_title : req.body.fields.industry_title,
				total_qtrly_wages : req.body.fields.total_qtrly_wages,
				avg_wkly_wage : req.body.fields.avg_wkly_wage,
				period : req.body.fields.period,
				month1_emplvl : req.body.fields.month1_emplvl,
			}
		});
        employment_wages.save(function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating employment_wages',
                    error: err
                });
            }
            return res.status(201).json(employment_wages);
        });
    },

    /**
     * employment_wagesController.update()
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

            employment_wages.industry_code = req.body.industry_code ? req.body.industry_code : employment_wages.industry_code;
			employment_wages.size_code = req.body.size_code ? req.body.size_code : employment_wages.size_code;
			employment_wages.lq_qtrly_contributions = req.body.lq_qtrly_contributions ? req.body.lq_qtrly_contributions : employment_wages.lq_qtrly_contributions;
			employment_wages.month2_emplvl = req.body.month2_emplvl ? req.body.month2_emplvl : employment_wages.month2_emplvl;
			employment_wages.year = req.body.year ? req.body.year : employment_wages.year;
			employment_wages.lq_qtrly_estabs_count = req.body.lq_qtrly_estabs_count ? req.body.lq_qtrly_estabs_count : employment_wages.lq_qtrly_estabs_count;
			employment_wages.month3_emplvl = req.body.month3_emplvl ? req.body.month3_emplvl : employment_wages.month3_emplvl;
			employment_wages.lq_month3_emplvl = req.body.lq_month3_emplvl ? req.body.lq_month3_emplvl : employment_wages.lq_month3_emplvl;
			employment_wages.lq_avg_wkly_wage = req.body.lq_avg_wkly_wage ? req.body.lq_avg_wkly_wage : employment_wages.lq_avg_wkly_wage;
			employment_wages.total_qtrly_wages = req.body.total_qtrly_wages ? req.body.total_qtrly_wages : employment_wages.total_qtrly_wages;
			employment_wages.industry_title = req.body.industry_title ? req.body.industry_title : employment_wages.industry_title;
			employment_wages.oty_total_qtrly_wages_pct_chg = req.body.oty_total_qtrly_wages_pct_chg ? req.body.oty_total_qtrly_wages_pct_chg : employment_wages.oty_total_qtrly_wages_pct_chg;
			employment_wages.oty_qtrly_contributions_pct_chg = req.body.oty_qtrly_contributions_pct_chg ? req.body.oty_qtrly_contributions_pct_chg : employment_wages.oty_qtrly_contributions_pct_chg;
			employment_wages.oty_qtrly_estabs_count_pct_chg = req.body.oty_qtrly_estabs_count_pct_chg ? req.body.oty_qtrly_estabs_count_pct_chg : employment_wages.oty_qtrly_estabs_count_pct_chg;
			employment_wages.oty_month2_emplvl_pct_chg = req.body.oty_month2_emplvl_pct_chg ? req.body.oty_month2_emplvl_pct_chg : employment_wages.oty_month2_emplvl_pct_chg;
			employment_wages.agglvl_code = req.body.agglvl_code ? req.body.agglvl_code : employment_wages.agglvl_code;
			employment_wages.oty_qtrly_estabs_count_chg = req.body.oty_qtrly_estabs_count_chg ? req.body.oty_qtrly_estabs_count_chg : employment_wages.oty_qtrly_estabs_count_chg;
			employment_wages.lq_total_qtrly_wages = req.body.lq_total_qtrly_wages ? req.body.lq_total_qtrly_wages : employment_wages.lq_total_qtrly_wages;
			employment_wages.size_title = req.body.size_title ? req.body.size_title : employment_wages.size_title;
			employment_wages.oty_avg_wkly_wage_chg = req.body.oty_avg_wkly_wage_chg ? req.body.oty_avg_wkly_wage_chg : employment_wages.oty_avg_wkly_wage_chg;
			employment_wages.oty_month1_emplvl_chg = req.body.oty_month1_emplvl_chg ? req.body.oty_month1_emplvl_chg : employment_wages.oty_month1_emplvl_chg;
			employment_wages.oty_taxable_qtrly_wages_pct_chg = req.body.oty_taxable_qtrly_wages_pct_chg ? req.body.oty_taxable_qtrly_wages_pct_chg : employment_wages.oty_taxable_qtrly_wages_pct_chg;
			employment_wages.area_titl = req.body.area_titl ? req.body.area_titl : employment_wages.area_titl;
			employment_wages.own_code = req.body.own_code ? req.body.own_code : employment_wages.own_code;
			employment_wages.oty_month3_emplvl_chg = req.body.oty_month3_emplvl_chg ? req.body.oty_month3_emplvl_chg : employment_wages.oty_month3_emplvl_chg;
			employment_wages.qtrly_estabs_count = req.body.qtrly_estabs_count ? req.body.qtrly_estabs_count : employment_wages.qtrly_estabs_count;
			employment_wages.oty_avg_wkly_wage_pct_chg = req.body.oty_avg_wkly_wage_pct_chg ? req.body.oty_avg_wkly_wage_pct_chg : employment_wages.oty_avg_wkly_wage_pct_chg;
			employment_wages.oty_month1_emplvl_pct_chg = req.body.oty_month1_emplvl_pct_chg ? req.body.oty_month1_emplvl_pct_chg : employment_wages.oty_month1_emplvl_pct_chg;
			employment_wages.oty_qtrly_contributions_chg = req.body.oty_qtrly_contributions_chg ? req.body.oty_qtrly_contributions_chg : employment_wages.oty_qtrly_contributions_chg;
			employment_wages.oty_month3_emplvl_pct_chg = req.body.oty_month3_emplvl_pct_chg ? req.body.oty_month3_emplvl_pct_chg : employment_wages.oty_month3_emplvl_pct_chg;
			employment_wages.period = req.body.period ? req.body.period : employment_wages.period;
			employment_wages.own_title = req.body.own_title ? req.body.own_title : employment_wages.own_title;
			employment_wages.oty_month2_emplvl_chg = req.body.oty_month2_emplvl_chg ? req.body.oty_month2_emplvl_chg : employment_wages.oty_month2_emplvl_chg;
			employment_wages.lq_month2_emplvl = req.body.lq_month2_emplvl ? req.body.lq_month2_emplvl : employment_wages.lq_month2_emplvl;
			employment_wages.oty_taxable_qtrly_wages_chg = req.body.oty_taxable_qtrly_wages_chg ? req.body.oty_taxable_qtrly_wages_chg : employment_wages.oty_taxable_qtrly_wages_chg;
			employment_wages.avg_wkly_wage = req.body.avg_wkly_wage ? req.body.avg_wkly_wage : employment_wages.avg_wkly_wage;
			employment_wages.qtr = req.body.qtr ? req.body.qtr : employment_wages.qtr;
			employment_wages.area_fips = req.body.area_fips ? req.body.area_fips : employment_wages.area_fips;
			employment_wages.qtrly_contributions = req.body.qtrly_contributions ? req.body.qtrly_contributions : employment_wages.qtrly_contributions;
			employment_wages.month1_emplvl = req.body.month1_emplvl ? req.body.month1_emplvl : employment_wages.month1_emplvl;
			employment_wages.agglvl_title = req.body.agglvl_title ? req.body.agglvl_title : employment_wages.agglvl_title;
			employment_wages.lq_disclosure_code = req.body.lq_disclosure_code ? req.body.lq_disclosure_code : employment_wages.lq_disclosure_code;
			employment_wages.lq_taxable_qtrly_wages = req.body.lq_taxable_qtrly_wages ? req.body.lq_taxable_qtrly_wages : employment_wages.lq_taxable_qtrly_wages;
			employment_wages.disclosure_code = req.body.disclosure_code ? req.body.disclosure_code : employment_wages.disclosure_code;
			employment_wages.taxable_qtrly_wages = req.body.taxable_qtrly_wages ? req.body.taxable_qtrly_wages : employment_wages.taxable_qtrly_wages;
			employment_wages.lq_month1_emplvl = req.body.lq_month1_emplvl ? req.body.lq_month1_emplvl : employment_wages.lq_month1_emplvl;
			employment_wages.oty_disclosure_code = req.body.oty_disclosure_code ? req.body.oty_disclosure_code : employment_wages.oty_disclosure_code;
			employment_wages.oty_total_qtrly_wages_chg = req.body.oty_total_qtrly_wages_chg ? req.body.oty_total_qtrly_wages_chg : employment_wages.oty_total_qtrly_wages_chg;
			
            employment_wages.save(function (err, employment_wages) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating employment_wages.',
                        error: err
                    });
                }

                return res.json(employment_wages);
            });
        });
    },

    /**
     * employment_wagesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Employment_wagesModel.findByIdAndRemove(id, function (err, employment_wages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the employment_wages.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
