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

    var x = await ClienteCadastrado.insert("Josasos", "joshss@j.com", "2222-2222", "-", "senha");
    console.log("Inserindo ClienteCadastrado>", x);
    var y = await ClienteCadastrado.getByEmail("joshss@j.com");
    console.log("Selecionando ClienteCadastrado>", y);
    var z = await ClienteCadastrado.deleteByEmail("joshss@j.com");
    console.log("Deletando ClienteCadastrado>", z);

    var x = await Empresa.insert("MC", "MC@j.com", "00000", ['sp', 'sp', 'rua jaca', '100', 'ap 2'], "senha");
    console.log("Inserindo Empresa>", x);
    var y = await Empresa.getByEmail("MC@j.com");
    console.log("Selecionando Empresa>", y);
    var z = await Empresa.deleteByEmail("MC@j.com");
    console.log("Deletando Empresa>", z);

    PGConnection.end();
}

test();
