const { get } = require('node-superfetch');

module.exports = class Info {
    /**
     * @param {string} baseURL 
     */
    constructor(baseURL) {
        /**
         * @private
         * @type {string}
         */
        this.baseURL = baseURL;
    }
    /**
     * @param {object} options
     * @param {string | []} options.images
     * @param {string} options.token
     * - Get information about the images of your choice from the API.
     */
    async get(options = {
        images: undefined,
        token: undefined
    }) {
        if (!options.images) throw new SyntaxError(`images is a required parameter`);
        let builtURL = this.baseURL + 'info/?';

        if (typeof options.images == 'string') {
            builtURL += `images=${builtURL}`;
        } else if (typeof options.images == 'object' && options.images !== null && options.images.length >= 1) {
            options.images.forEach(image => {
                builtURL += `images=${image}&`;
            })
        } else {
            throw new TypeError(`${typeof options.images} provided, expected a valid string or object`);
        }
        let headers = {};

        if (this.token || options.token) {
            headers = { headers: { 'Authorization': 'Bearer ' + (this.token ? this.token : options.token) } };
        }

        const Data = await get(builtURL, headers);

        return Data.body;

    }
}