describe("RandomFlickerImageComponent", function() {
	var viewModel;
	var deferred;
	var params = {
		pollingSecondsInterval: 2
	};
	var sampleImagedata = {
		photos: {
			photo: [
				{
					farm: 1,
					id: "id1",
					isfamily: 0,
					isfriend: 0,
					ispublic: 1,
					owner: "126866824@N03",
					secret: "secret1",
					server: "server1",
					title: "IMG_4058-Edit.jpg"
				},
				{
					farm: 2,
					id: "id2",
					isfamily: 0,
					isfriend: 0,
					ispublic: 1,
					owner: "126866824@N03",
					secret: "secret2",
					server: "server2",
					title: "IMG_4058-Edit.jpg"
				}
			]
		},
		stat: "ok"
	};

	beforeEach(function() {
			deferred = $.Deferred();
			spyOn($,"getJSON").and.returnValue(deferred);

			viewModel = new RandomFlickerImageComponent(params);
	});

	describe("constructor", function() {
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

	describe("startTimer", function() {
		beforeEach(function() {
			jasmine.clock().install();
		});

		it("should call setTimeinterval with a timeout of the pollingInterval value", function() {
			spyOn(viewModel, 'refreshImage');
				
    		viewModel.startTimer();
    		expect(viewModel.refreshImage).not.toHaveBeenCalled();

    		jasmine.clock().tick(viewModel.pollingInterval()); 
    		expect(viewModel.refreshImage).toHaveBeenCalled();
		});

		afterEach(function() {
  			jasmine.clock().uninstall();
		});
	});

	describe("refreshImage", function() {
		it("should set the value of imageUrl from the first available imageUrls", function() {
			viewModel.imageUrl("");
			viewModel.refreshImage();

			expect(viewModel.imageUrl()).toEqual("placeholder.jpg");
		});
	});

	describe("retrieveImages", function() {
		it("should make ajax call to flicker api with correct url and some callback", function() {
			var expectedUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + viewModel.flickerApiKey + "&format=json&nojsoncallback=1";

			viewModel.retrieveImages();
			
			expect($.getJSON).toHaveBeenCalledWith(expectedUrl);
		});

		describe("when call is succesful", function() {
			beforeEach(function() {
				spyOn(viewModel, "processImageData");
			});

			it("should processImageData", function() {
				deferred.resolve(sampleImagedata);

				expect(viewModel.processImageData).toHaveBeenCalledWith(sampleImagedata);
			});
		});
	});

	describe("processImageData",function() {
		it("should set imageUrls using flicker image objects", function() {
			viewModel.imageUrls = [];

			viewModel.processImageData(sampleImagedata);

			expect(viewModel.imageUrls.length).toBe(2);
			expect(viewModel.imageUrls[0]).toEqual("http://farm1.static.flickr.com/server1/id1_secret1.jpg");
			expect(viewModel.imageUrls[1]).toEqual("http://farm2.static.flickr.com/server2/id2_secret2.jpg");
		});

		it("should not set any imageUrls if no data is present", function() {
			viewModel.imageUrls = [];
			viewModel.processImageData();

			expect(viewModel.imageUrls).toEqual([]);
		});
	});

	describe("getNextAvailableImageUrl", function() {
		it("should return the placeholder image url if there are no imageUrls available", function() {
			viewModel.imageUrls = [];

			expect(viewModel.getNextAvailableImageUrl()).toEqual("placeholder.jpg");
		});

		it("should return the next available url from imageUrls when available", function() {
			viewModel.imageUrls = ["url1", "url2", "url3"];
			var url = viewModel.getNextAvailableImageUrl();
			
			expect(url).toEqual("url1");
		});

		it("should reduce the imageUrls length by 1 everytime it's called", function() {
			viewModel.imageUrls = ["url1", "url2", "url3"];

			expect(viewModel.imageUrls.length).toEqual(3);
			viewModel.getNextAvailableImageUrl();
			expect(viewModel.imageUrls.length).toEqual(2);
		});
	});

	describe("composeImageUrl", function() {
		it("should return a valid flicker url", function() {
			var testImage = {
				farm: 2,
				id: "24528607524",
				isfamily: 0,
				isfriend: 0,
				ispublic: 1,
				owner: "126866824@N03",
				secret: "cf05625dce",
				server: "1596",
				title: "IMG_4058-Edit.jpg"
			};
			var url = viewModel.composeImageUrl(testImage);

			expect(url).toEqual("http://farm2.static.flickr.com/1596/24528607524_cf05625dce.jpg");
		});

		it("should return empty string if no image is provided", function() {
			expect(viewModel.composeImageUrl()).toEqual("");
		});
	});
});
