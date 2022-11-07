const bodyParser = require("body-parser");
const express = require("express");
const { query } = require("express");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(8080);

app.get("/teste", (req, res) => {
    return res.json("up");
})

const { pool } = require("./src/database/database");

// Mostrar todos os votos
app.get('/todosVotos', (req, res) => {
    const todosVotos = async (res) => {
        const query = `SELECT * FROM "voto"`;
        await pool.query(query).then((res) => {
            if(res.rows)
            {
                console.table(res.rows);
            }
            else{
                console.log("erro");
            }
        })
    }

    return todosVotos()
})

// Mostrar voto de um politico
app.post('/umVoto' , (req, res) => {
    const { id_politico } = req.body;

    const umVoto = async (res) => {
        const query = `SELECT "resposta" FROM "voto" WHERE "id_politico" = '${id_politico}'`;
        await pool.query(query).then((resp) => {
            if (resp.rows) {
                console.table(resp.rows)
            }
        })
    }
    return umVoto()
})

// Mostrar quantidade de votos positivo
app.get('/votosPos' , (req, res) => {
    const {id_sessao} = req.body
    const votosPos = async (res) => {
        const query = `SELECT count("voto".resposta) FROM "voto" 
        WHERE ("voto".resposta) = 1`;
        await pool.query(query).then((resp) => {
            if (resp.rows) {
                console.table(resp.rows)
            }
        })
    }
    // const updateVotoPos = async (res) =>{
    //     const query = `UPDATE "sessao" 
    //     SET "Qtd_VotosPos" = '${votoPos}'
    //     WHERE "sessao"."ID" = '1'`
    // }
    return votosPos()   
})

// Mostrar quantidade de votos negativos
app.get('/votosNeg' , (req, res) => {
    const votosNeg = async (res) => {
        const query = `SELECT count("voto".resposta) FROM "voto" WHERE ("voto".resposta) = 2`;
        await pool.query(query).then((resp) => {
            if (resp.rows) {
                console.table(resp.rows)
            }
        })
    }
    return votosNeg()
})

// Atualizar voto

app.put('/update', (req, res) => {
    const {id_sessao, id_politico, resposta, estado} = req.body
    const atualizarBanco = async (res) => {
        const query = `UPDATE "voto" 
        SET id_politico = '${id_politico}', resposta = '${resposta}', estado = '${estado}' WHERE id_sessao = ${id_sessao}`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return atualizarBanco();
})

// Deletar voto
app.delete('/delete', (req, res) => {
    const { id_politico, id_sessao } = req.body;
    const {id, nome, tipo} = req.body
    const deleteBanco = async (res) => {
        const query = `DELETE FROM "voto" WHERE "voto".id_politico = '${id_politico}' and "voto".id_sessao = '${id_sessao}'`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return deleteBanco();
})

// Criar voto
app.post('/votoSessao', (req, res) => {
    const {id_sessao, id_politico, resposta, estado} = req.body
    const inserirBanco = async (res) => {
        const query = `INSERT INTO "voto" ("id_sessao", "id_politico", "resposta", "estado") VALUES ('${id_sessao}', '${id_politico}', '${resposta}', '${estado}')`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI")
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return inserirBanco();
})

// Criar Sessao
app.post('/sessao', (req, res) => {
    const {id_sessao, nome, descricao, tipo, opcao1, opcao2, participacao, data_inicial, data_final, controle, qtde_max, qtde_votoPos, qtde_votoNeg, estado} = req.body
    const inserirBanco = async (res) => {
        const query = `INSERT INTO "sessao" ("id_sessao", "nome", "descricao", "tipo", "opcao1", "opcao2", "participacao", "data_inicial", "data_final", "controle", "qtde_max", "qtde_votoPos", "qtde_votoNeg", "estado") VALUES ('${id_sessao}', '${nome}', '${descricao}', '${tipo}', '${opcao1}', '${opcao2}', '${participacao}', '${data_inicial}', '${data_final}', '${controle}', '${qtde_max}', '${qtde_votoPos}', '${qtde_votoNeg}' '${estado}')`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return inserirBanco();
})

// Mostrar Sessao
app.get('/todasSessao', (req, res) => {
    const todasSessao = async (res) => {
        const query = `SELECT * FROM "sessao"`;
        await pool.query(query).then((res) => {
            if(res.rows)
            {
                console.table(res.rows);
            }
            else{
                console.log("erro");
            }
        })
    }
    return todasSessao()
});

// Atualizar Sessao
app.put('/updateSessao', (req, res) => {
    const {id_sessao, nome, descricao} = req.body
    const atualizarBanco = async (res) => {
        const query = `UPDATE "sessao"
        SET nome = '${nome}', descricao = '${descricao}' WHERE id_sessao = '${id_sessao}'`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return atualizarBanco();
})

// Deletar Sessao
app.delete('/deleteSessao/:index', (req, res) => {
    const { index } = req.params;
    const deleteBanco = async (res) => {
        const query = `DELETE FROM "sessao" WHERE id = '${index}'`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return deleteBanco();
})


// Criar Politico
app.post('/politico', (req, res) => {
    const {id_politico, usuario, login, senha} = req.body
    const inserirBanco = async (res) => {
        const query = `INSERT INTO "politico" ("id", "usuario", "login", "senha") VALUES ('${id_politico}', '${usuario}', '${login}', '${senha}')`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return inserirBanco();
})

// Mostrar politicos
app.get('/todosPoliticos', (req, res) => {
    const todosPoliticos = async (res) => {
        const query = `SELECT * FROM "politico"`;
        await pool.query(query).then((res) => {
            if(res.rows)
            {
                console.table(res.rows);
            }
            else{
                console.log("erro");
            }
        })
    }
    return todosPoliticos()
});

// Atualizar politico
app.put('/updatePolitico', (req, res) => {
    const {id_politico, usuario, login, senha} = req.body
    const atualizarBanco = async (res) => {
        const query = `UPDATE "politico" 
        SET usuario = '${usuario}', login = '${login}', senha = '${senha}' WHERE ID = '${id_politico}'`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return atualizarBanco();
})

// Deletar Politico
app.delete('/deletePolitico/:index', (req, res) => {
    const { index } = req.params;
    const deleteBanco = async (res) => {
        const query = `DELETE FROM "politico" WHERE id = '${index}'`;
        await pool.query(query).then((res) => {
            if(res.rows){
                console.log("FOI");
            } else{
                console.log("NãO FOI");
            }
        })
    }
    return deleteBanco();
})