// Author: Carlos Pinto 
// 02/20/2016

var RandomFlickerImageComponent = function(params) {
    var self            = this;
    var componentParams = params || {pollingSecondsInterval: 5};

    this.pollingInterval = ko.observable(componentParams.pollingSecondsInterval);
    this.imageUrl        = ko.observable();
    this.timer           = null;
    this.imageUrls       = [];
    this.flickerApiKey   = "1b32f0e9fbf2d2ce345e5c736fa1dc75"; 
    self.initialize();
};

RandomFlickerImageComponent.prototype = {
    'initialize': function() {
        this.pollingInterval(this.pollingInterval() * 1000);
        this.refreshImage();
        this.startTimer();
    },
    'startTimer': function() {
        var self = this;

        this.timer = setInterval(function() {
            self.refreshImage();
        }, self.pollingInterval());
    },
    'refreshImage': function() {
        this.imageUrl(this.getNextAvailableImageUrl()); 
    },
    'retrieveImages': function() {
        var self = this;
        var requestUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + this.flickerApiKey + "&format=json&nojsoncallback=1";

        $.getJSON(requestUrl)
        .done(function(response) {
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
                this.imageUrls.push(this.composeImageUrl(rawImageData[i]));
            }
        }
    },
    'getNextAvailableImageUrl' : function() {
        var imageUrl = "placeholder.jpg";
        if(this.imageUrls.length)
            imageUrl = this.imageUrls.splice(0,1)[0];
        else 
            this.retrieveImages();
        
        return imageUrl;
    },
    'composeImageUrl': function(image) {
        if(!image)
            return "";

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
    viewModel: RandomFlickerImageComponent,
    template: '<div class="random-flicker-image"><img data-bind="attr: { src: imageUrl }"/></div>'
});