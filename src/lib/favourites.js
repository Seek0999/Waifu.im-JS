const { get } = require('node-superfetch');
const { Tags } = require('./assets');
module.exports = class Favourites {
    /**
    * @constructor
    * @param {string} token
    * @param {string} baseURL
    */
    constructor(token, baseURL) {
        /**
          * @private
          * @type {string}
         */
        this.token = token;

        /**
          * @type {string}
          * @private
          * Base URL for the API
         */
        this.baseURL = baseURL;
    }

    /**
     * - https://api.waifu.im/fav/
     * - This function will refuse to function when provided with an invalid token.
     * @param {object} options
     * @param {string} options.user_id - Force the API to return images with, at least all the provided tags
     * @param {[]} options.selected_tags - Force the API to return images with, at least all the provided tags
     * @param {[]} options.excluded_tags - Force the API to return images without any of the provided tags
     * @param {true | false | null} options.is_nsfw - Force or exclude lewd files, only works if the selected_tags aren't specially nsfw (see difference between versatile and nsfw tags above). You can provide null to make it be random. Default to False.
     * @param {true | false} options.gif - Force or prevent the API to return .gif files.
     * @param {"FAVOURITES" | "UPLOADED_AT" | null} options.order_by - You can choose to order the image by one of the following: FAVOURITES, UPLOADED_AT
     * @param {"LANDSCAPE" | "PORTRAIT" | null} options.orientation - You can choose the orientation of your image using one of the following: LANDSCAPE, PORTRAIT
     * @param {true | false} options.many - Return an array of 30 files if True.
     * @param {[]} options.excluded_files - Exclude the file(s). You can or not provide the file extension.
     * @param {string} options.token - Your unique API Token, If you've provided your token via the client you aren't required to pass this.
     */
    async view(options = {
        user_id: undefined,
        selected_tags: [],
        excluded_tags: [],
        is_nsfw: undefined,
        gif: undefined,
        order_by: undefined,
        orientation: undefined,
        many: undefined,
        excluded_files: [],
        token: undefined,
    }) {
        if (!options.token && !this.token) throw new SyntaxError(`token is a required parameter`)
        let builtURL = this.baseURL + 'fav/?';
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
         * User_id query builder
         */
        if (!isNaN(options.user_id)) builtURL += `user_id=${options.user_id}&`;
        let headers = {};

        if (this.token || options.token) {
            headers = { headers: { 'Authorization': 'Bearer ' + (this.token ? this.token : options.token) } };
        }

        const Data = await get(builtURL, headers)

        return Data.body;
    }
}