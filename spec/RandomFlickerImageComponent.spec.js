describe("RandomFlickerImageComponent", function() {
	var viewModel;
	var deferred;
	var params = {
		pollingSecondsInterval: 2
	};

	describe("constructor", function() {
		beforeEach(function() {
			deferred = $.Deferred();
			spyOn($,"getJSON").and.returnValue(deferred);

			viewModel = new RandomFlickerImageComponent(params);
		});

		describe("pollingInterval", function() {

			it("should set pollingInterval to a knockout observable", function() {
				expect(viewModel.pollingInterval()).toBe(2000);
			});

			it("should default pollingInterval to 5000 when param not passed", function() {
				viewModel = new RandomFlickerImageComponent();

				expect(viewModel.pollingInterval()).toBe(5000);
			});

			it("should be a knockout observable", function() {
				expect(ko.isObservable(viewModel.pollingInterval)).toBe(true);
			});
		});

		describe("imageUrl", function() {
			it("should set imageUrl to an knockout observable", function() {
				expect(ko.isObservable(viewModel.imageUrl)).toBe(true);
			});

			it("should set imageUrl to placeholder.jpg when first initialized", function() {
				expect(viewModel.imageUrl()).toBe("placeholder.jpg");
			});
		});

		it("should set timer to a timer number", function() {
			expect(typeof viewModel.timer).toBe("number");
		});

		it("should set imageUrls to an empty array", function() {
			expect(viewModel.imageUrls).toEqual([]);
		});
	});
});
