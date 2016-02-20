var RandomFlickerImage = function(params) {
    this.pollingInterval = params.pollingInterval;
    this.imageUrl = ko.observable();
    this.title = ko.observable();

    this.retrieveImage();
};

RandomFlickerImage.prototype = {
    'retrieveImage': function() {
        var self = this;
        var requestUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=1b32f0e9fbf2d2ce345e5c736fa1dc75&format=json&nojsoncallback=1";

        $.getJSON(requestUrl, function(response) {
            var singleImage = self.getSingleImage(response);
            var imageUrl = self.getImageUrl(singleImage); 
            self.imageUrl(imageUrl);
        })
        .fail(function() {
            console.log("image retrieve failed, using placeholder image");
            self.imageUrl = "someimage.jpg";
        });
    },
    'getSingleImage': function(flickerResponse) {
        if(flickerResponse && flickerResponse.photos && Array.isArray(flickerResponse.photos.photo)) {
            return flickerResponse.photos.photo[0];
        }

        return null;
    },
    'getImageUrl': function(image) {
        var imageUrl = [
            'http://farm', 
            image.farm, 
            '.static.flickr.com/',
            image.server,
            '/',
            image.id,
            '_',
            image.secret,
            '.jpg'];
        
        return imageUrl.join("");
    }
};

ko.components.register('random-flicker-image', {
    viewModel: RandomFlickerImage,
    template: '<div class="random-flicker-image-container"><img data-bind="attr: { src: imageUrl }"/></div>'
});