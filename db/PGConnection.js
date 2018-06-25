const { Client } = require('pg');

class PGConnectionClass {
    constructor() {
        this.client = new Client();
        (async()=>await this.client.connect())();
    }

    async query(text, values) {
        let query = {
            text: text,
            values: values
        };
        return await this.client.query(query);
    }

    end() {
        this.client.end();
    }

    newConnection() {
        return new PGConnectionClass();
    }
}

module.exports = new PGConnectionClass();
