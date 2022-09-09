const { get } = require('node-superfetch');
/**
* @class Random
*/
module.exports = class Random {
    /**
     * @constructor
     * @param {string} token 
     * @param {string} baseURL
     */
    constructor(token, baseURL) {
        /**
          * Your Waifu.im API Token
          * @type {string}
          * @private
         */
        this.token = token;

        /**
          * The base URL.
          * @type {string}
          * @private
         */
        this.baseURL = baseURL;
    }

    /**
     * @description https://api.waifu.im/random/
     * @description For more info refer to https://waifu.im/docs
     * @param {object} options
     * @param {[]} options.selected_tags - Force the API to return images with, at least all the provided tags
     * @param {[]} options.excluded_tags - Force the API to return images without any of the provided tags
     * @param {true | false | null} options.is_nsfw - Force or exclude lewd files, only works if the selected_tags aren't specially nsfw (see difference between versatile and nsfw tags above). You can provide null to make it be random. Default to False.
     * @param {true | false} options.gif - Force or prevent the API to return .gif files.
     * @param {"FAVOURITES" | "UPLOADED_AT" | null} options.order_by - You can choose to order the image by one of the following: FAVOURITES, UPLOADED_AT
     * @param {"LANDSCAPE" | "PORTRAIT" | null} options.orientation - You can choose the orientation of your image using one of the following: LANDSCAPE, PORTRAIT
     * @param {true | false} options.many - Return an array of 30 files if True.
     * @param {true | false} options.full - Returns the full result without any limit (admins only)
     * @param {[]} options.excluded_files - Exclude the file(s). You can or not provide the file extension.
     * @param {string} options.token - Your unique API Token, If you've provided your token via the client you aren't required to pass this.
     */
    async fetch(options = {
        selected_tags: Array(),
        excluded_tags: Array(),
        is_nsfw: undefined,
        gif: undefined,
        order_by: undefined,
        orientation: undefined,
        many: undefined,
        full: undefined,
        excluded_files: Array(),
        token: undefined
    }) {
        let builtURL = this.baseURL + 'random/?';
        const Tags = require('./assets').Tags;
        /**
        * Selected_tags query builder
        */
        if (typeof options.selected_tags == 'object' && options.selected_tags?.length >= 1) {
            options.selected_tags.forEach(tag => {
                tag = tag.toLowerCase();
                if (Tags.includes(tag)) builtURL += `selected_tags=${tag}&`;
            });
        };

        /**
        * Excluded_tags query builder
        */
        if (typeof options.excluded_tags == 'object' && options.excluded_tags?.length >= 1) {
            options.excluded_tags.forEach(tag => {
                tag = tag.toLowerCase();
                if (Tags.includes(tag)) builtURL += `excluded_tags=${tag}&`;
            });
        };

        /**
        * Excluded_files query builder
        */
        if (typeof options.excluded_files == 'object' && options.excluded_files?.length >= 1) {
            options.excluded_files.forEach(file => {
                if (file) builtURL += `excluded_files=${file}&`;
            });
        };

        /**
        * Orientation query builder
        */
        if (['LANDSCAPE', 'PORTRAIT'].includes(typeof options.orientation == 'string' ? options.orientation?.toUpperCase() : null)) builtURL += `orientation=${options.orientation}&`;

        /**
         * Order_by query builder
         */
        if (['UPLOADED_AT', 'FAVOURITES'].includes(String(options.order_by).toUpperCase())) builtURL += `order_by=${options.order_by}&`;

        /**
         * Is_nsfw query builder
         */
        if (['true', 'false', 'null'].includes(String(options.is_nsfw))) builtURL += `is_nsfw=${options.is_nsfw}&`;

        /**
         * Gif query builder
         */
        if (['true', 'false'].includes(String(options.gif))) builtURL += `gif=${options.gif}&`;

        /**
         * Many query builder
         */
        if (['true', 'false'].includes(String(options.many))) builtURL += `many=${options.many}&`;

        /**
         * Full query builder
         */
        if (['true', 'false'].includes(String(options.full))) builtURL += `full=${options.full}`;

        let headers = {};

        if (this.token || options.token) {
            headers = { headers: { 'Authorization': 'Bearer ' + (this.token ? this.token : options.token) } };
        }

        const Data = await get(builtURL, headers)

        return Data.body;
    }
}