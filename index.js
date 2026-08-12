import express from "express"
const app = express()
app.use(express.json())

const contatos = [
    {
        id: 1,
        nome: "SBT-Bomdia&Companhia",
        telefone: "47 40028922",
        email: "sbt.bomdia&companhia@email.com"
    },
    
    {
        id: 2,
        nome: "Bruno Costas",
        telefone: "47 993425892",
        email: "brunocostas621@email.com"
    },

    {
        id: 3,
        nome: "Carlos da Silva",
        telefone: "41 553925328",
        email: "dasilvacarlos@email.com"
    }
]

app.get("/contatos", (req, res) => {
    const { nome } = req.query

    let resultado = contatos

    if (nome) {
        resultado = contatos.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    res.status(200).json(resultado)
})

app.get("/contatos/xml", (req, res) => {
    const { nome } = req.query

    let resultado = contatos

    if (nome) {
        resultado = contatos.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    let itens = ""
    for (const c of resultado) {
        itens += `<contato><id>${c.id}</id><nome>${c.nome}</nome><telefone>${c.telefone}</telefone><email>${c.email}</email></contato>`
    }

    res.status(200).type("application/xml").send(`<contatos>${itens}</contatos>`)
})

app.get("/contatos/:id", (req, res) => {
    const id = Number(req.params.id)
    const contato = contatos.find(c => c.id === id)

    if (!contato) {
        res.status(404).json({ erro: "contato não encontrado" })
        return
    }

    res.status(200).json(contato)
})

app.get("/contatos/:id/xml", (req, res) => {
    const id = Number(req.params.id)
    const contato = contatos.find(c => c.id === id)

    if (!contato) {
        res.status(404).type("application/xml").send(`<erro>contato não encontrado</erro>`)
        return
    }

    res.status(200)
        .type("application/xml")
        .send(`<contato><id>${contato.id}</id><nome>${contato.nome}</nome><telefone>${contato.telefone}</telefone><email>${contato.email}</email></contato>`)
})

app.post("/contatos", (req, res) => {
    const { nome, telefone, email } = req.body

    if (!nome || !telefone) {
        res.status(400).json({ erro: "nome e telefone são obrigatórios" })
        return
    }

    let novoId = 1
    if (contatos.length > 0) {
        novoId = contatos[contatos.length - 1].id + 1
    }

    const novoContato = { id: novoId, nome, telefone, email }
    contatos.push(novoContato)

    res.status(201).json(novoContato)
})

app.put("/contatos/:id", (req, res) => {
    const id = Number(req.params.id)
    const contato = contatos.find(c => c.id === id)

    if (!contato) {
        res.status(404).json({ erro: "contato não encontrado" })
        return
    }
    if (req.body?.nome && req.body.nome !== "") {
        contato.nome = req.body.nome
    }
    if (req.body?.telefone && req.body.telefone !== "") {
        contato.telefone = req.body.telefone
    }
    if (req.body?.email && req.body.email !== "") {
        contato.email = req.body.email
    }
    res.status(200).json(contato)
})

app.delete("/contatos/:id", (req, res) => {
    const id = Number(req.params.id)
    const indice = contatos.findIndex(c => c.id === id)

    if (indice === -1) {
        res.status(404).json({ erro: "contato não encontrado" })
        return
    }
    contatos.splice(indice, 1)
    res.status(204).send()
})

const porta = 3000
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))