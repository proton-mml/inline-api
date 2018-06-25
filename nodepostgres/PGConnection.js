const fs = require('fs');
const { Client } = require('pg');

class PGConnectionClass {
    constructor() {
        this.client = new Client();
        (async()=>await this.client.connect())();
    }

    async query(text, values) {
        var query = {
            text: text,
            values: values
        };

        return await this.client.query(query);
    }

    end() {
        this.client.end();
    }
}

module.exports = new PGConnectionClass();


