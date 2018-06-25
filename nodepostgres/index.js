const ClienteCadastrado = require('./ClienteCadastrado.js');
const Empresa = require('./Empresa.js');
const Estabelecimento = require('./Estabelecimento.js');
const Avaliacao = require('./Avaliacao.js');
const PGConnection = require('./PGConnection.js');

async function test() {
    var frank = (await ClienteCadastrado.getByEmail('frank@uol.com'));
    console.log(frank);

    var fanfa = (await Empresa.getByEmail('fanfa@fanfa.com'));
    console.log(fanfa);

    var fanfafa = (await Estabelecimento.getByEmail('fanfafa@fanfa.com'));
    console.log(fanfafa);

    await Avaliacao.insert(5, 'Excelente', 'fanfafa@fanfa.com', 'frank@uol.com');

    var av_fanfafa = (await Avaliacao.getByEmailEstabelecimento('fanfafa@fanfa.com'))
    console.log(av_fanfafa);

    await Avaliacao.deleteById(2);

    av_fanfafa = (await Avaliacao.getByEmailEstabelecimento('fanfafa@fanfa.com'))
    console.log(av_fanfafa);
    
    PGConnection.end();
}

test();

