const Random = require('./lib/random.js');
const Info = require('./lib/info');
const Favourite = require('./lib/favourites');
const Tags = require('./lib/assets').TagTypes

module.exports = class WaifuClient {
    /**
     * @constructor
     * @param {string} token
     * @description Your waifu.im Token can be found at https://waifu.im/dashboard/
     */
    constructor(token) {
        /**
        * The base URL for the API
        * @type {string}
        * @private
        */
        this.token = token;

        /**
         * The base URL for the API
         * @type {string}
         * @private
         */
        this.baseURL = 'https://api.waifu.im/';

        /**
        * The Waifu.im Random Module.
        * @description Fetch a random image from the API
        */
        this.random = new Random(this.token, this.baseURL).fetch

        /**
        * The Waifu.im Favourite Module.
        * @description View & Edit your favourite Waifu.im Images!
        */
        this.favourites = new Favourite(this.token, this.baseURL)

        /**
        * The Waifu.im Info Module.
        * @description Get a range of information about images from the API!
        */
        this.info = new Info(this.baseURL).get;

        /**
        * Waifu.im Tags
        * @description Object full of all the currently supported Waifu.im Tags!
        */
        this.tags = Tags;

    }
}