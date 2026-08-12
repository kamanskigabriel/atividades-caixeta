import express from "express"
const app = express()
app.use(express.json())

const contatos = [
    {
        id: 1,
        nome: "SBT-Bomdia&Companhia",
        telefone: "47 40028922",
        email: "SBTbomdia&companhia@gmail.com"
    },

    {
        id: 2,
        nome: "Bruno Costas",
        telefone: "47 993425892",
        email: "brunocostas621@gmail.com"
    },

    {
        id: 3,
        nome: "Carlos da Silva",
        telefone: "41 553925328",
        email: "dasilvacarlos@gmail.com"
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

const porta = 3000
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))