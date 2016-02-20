var RandomFlickerImage = function(params) {
    var self = this;

    this.pollingInterval = ko.observable(params.pollingSecondsInterval*1000 || 5000);
    this.imageUrl = ko.observable();
    this.title = ko.observable();
    this.timer = null;
    this.imageUrls = [];

    self.initialize();
};

RandomFlickerImage.prototype = {
    'initialize': function() {
        this.imageUrl(this.getNextAvailableImageUrl());
        this.startTimer();
    },
    'startTimer': function() {
        var self = this;

        this.timer = setInterval(function() { 
            self.imageUrl(self.getNextAvailableImageUrl()); 
        }, self.pollingInterval());
    },
    'resetTimer': function() {
        clearTimeout(this.timer);
    },
    'retrieveImages': function() {
        var self = this;
        var requestUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=1b32f0e9fbf2d2ce345e5c736fa1dc75&format=json&nojsoncallback=1";

        $.getJSON(requestUrl, function(response) {
            self.processImageData(response);
        })
        .fail(function() {
            console.log("image retrieve failed! Check API flicker Key.");
        });
    },
    'processImageData': function(imageData) {
        this.imageUrls = [];

        if(imageData && imageData.photos && Array.isArray(imageData.photos.photo)) {
            var rawImageData =  imageData.photos.photo;
            for(var i =0; i<rawImageData.length; i++) {
                this.imageUrls.push(this.getImageUrl(rawImageData[i]));
            }
        }

        this.imageUrls.push("placeholder.jpg");
    },
    'getNextAvailableImageUrl' : function() {
        var imageUrl = "placeholder.jpg";
        if(this.imageUrls.length) {
            imageUrl = this.imageUrls.splice(0,1);
        }
        else {
            this.retrieveImages();
        }

        return imageUrl;
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