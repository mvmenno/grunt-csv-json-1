var CsvDoc = require('./CsvDoc');
var DataTree = require('./DataTree');

function process(contents, options, cb) {
	var doc = CsvDoc.create({
		parserOptions : options.parserOptions,
		processValue : options.processValue
	});

	doc.parse(contents, function (err, data) {
		var keys = data.keys;
		var dataSets = [];

		data.sets.forEach(function (set, i) {
			var tree = DataTree.create();
			var name = data.names[i];
			
			var arr = {};
			
			set.forEach(function (val, k) {
				arr[keys[k]] = val;
			});
			dataSets.push({
				name : name,
				data : arr
			});
		});

		cb(null, dataSets);
	});
}

module.exports = {
	process : process
};
