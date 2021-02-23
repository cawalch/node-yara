
var assert = require("assert")

var yara = require ("../")

var scanner

before(function(done) {
	yara.initialize(function(error) {
		assert.ifError(error)

		scanner = yara.createScanner()

		scanner.configure({
				rules: [
					{string: "import \"pe\"\n"},
					{string: "import \"elf\"\n"},
					{string: "rule is_stephen : human man {\nmeta:\nm1 = \"m1\"\nm2 = true\nm3 = 123\n\nstrings:\n$s1 = \"stephen\"\ncondition:\n(age == 35) and (any of them)\n}"},
					{string: "rule is_silvia : human womman{\nstrings:\n$s1 = \"silvia\"\ncondition:\nany of them\n}"},
					{string: "rule is_either : human man woman {\nstrings:\n$s1 = \"stephen\"\n$s2 = \"silvia\"\ncondition:\nany of them\n}"},
				],
				variables: [
					{type: yara.VariableType.Integer, id: "age", value: 25}
				]
			}, function(error) {
				assert.ifError(error)
				done()
			})
	})
})

describe("index.js", function() {
	describe("Scanner.reconfigureRules()", function() {
		it("Will change variable value", function(done) {
			var req = {
				buffer: Buffer.from("my name is stephen")
			}

			scanner.reconfigureRules( {variables: [
					{type: yara.VariableType.Integer, id: "age", value: 35}
				]
			})

			scanner.scan(req, function(error, result) {
				assert.ifError(error)

				var expected = {
					"rules": [
						{
							"id": "is_stephen",
							"tags": ["human", "man"],
							"matches": [
								{offset: 11, length: 7, id: "$s1"}
							],
							"metas": [
								{type: 2, id: "m1", value: "m1"},
								{type: 3, id: "m2", value: true},
								{type: 1, id: "m3", value: 123}
							]
						},
						{
							"id": "is_either",
							"tags": ["human", "man", "woman"],
							"matches": [
								{offset: 11, length: 7, id: "$s1"}
							],
							"metas": []
						}
					]
				}

				assert.deepEqual(result, expected)

				done()
			})
		})
	})
})
