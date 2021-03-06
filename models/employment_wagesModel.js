var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var employment_wagesSchema = new mongoose.Schema({
	'fields' : {
		'area_title' : String,
		'industry_code' : String,
		'industry_title' : String,
		'total_qtrly_wages' : Number,
		'avg_wkly_wage' : Number,
		'month1_emplvl' : Number,
		'period' : String,
		'size_code' : String | null,
		'lq_qtrly_contributions' : Number | null,
		'month2_emplvl' : Number | null,
		'year' : String | null,
		'lq_qtrly_estabs_count' : Number | null,
		'month3_emplvl' : Number | null,
		'lq_month3_emplvl' : Number | null,
		'lq_avg_wkly_wage' : Number | null,
		'oty_total_qtrly_wages_pct_chg' : Number | null,
		'oty_qtrly_contributions_pct_chg' : Number | null,
		'oty_qtrly_estabs_count_pct_chg' : Number | null,
		'oty_month2_emplvl_pct_chg' : Number | null,
		'agglvl_code' : String | null,
		'oty_qtrly_estabs_count_chg' : Number | null,
		'lq_total_qtrly_wages' : Number | null,
		'size_title' : String | null,
		'oty_avg_wkly_wage_chg' : Number | null,
		'oty_month1_emplvl_chg' : Number | null,
		'oty_taxable_qtrly_wages_pct_chg' : Number | null,
		'own_code' : String | null,
		'oty_month3_emplvl_chg' : Number | null,
		'qtrly_estabs_count' : Number | null,
		'oty_avg_wkly_wage_pct_chg' : Number | null,
		'oty_month1_emplvl_pct_chg' : Number | null,
		'oty_qtrly_contributions_chg' : Number | null,
		'oty_month3_emplvl_pct_chg' : Number | null,
		'own_title' : String | null,
		'oty_month2_emplvl_chg' : Number | null,
		'lq_month2_emplvl' : Number | null,
		'oty_taxable_qtrly_wages_chg' : Number | null,
		'qtr' : String | null,
		'area_fips' : String | null,
		'qtrly_contributions' : Number | null,
		'agglvl_title' : String | null,
		'lq_disclosure_code' : String | null,
		'lq_taxable_qtrly_wages' : Number | null,
		'disclosure_code' : String | null,
		'taxable_qtrly_wages' : Number | null,
		'lq_month1_emplvl' : Number | null,
		'oty_disclosure_code' : String | null,
		'oty_total_qtrly_wages_chg' : Number | null
	},
	'datasetid' : String | null,
	'recordid' : String | null,
	'record_timestamp': String | null
});

employment_wagesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('employment_wages', employment_wagesSchema, 'census');
