import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import React from "react"

export default function App() {
    const [nomeDoFilme, setNomeDoFilme] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [horário, setHorário] = React.useState([]);
    const [lugar, setLugar] = React.useState([]);
    const [compradorNome, setCompradorNome] = React.useState([]);
    const [compradorCpf, setCompradorCpf] = React.useState([]);
    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
           <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessoes/:idFilme" element={<SessionsPage setNomeDoFilme={setNomeDoFilme} setData={setData} setHorário={setHorário} />} />
            <Route path="/assentos/:idSessao" element={<SeatsPage setCompradorCpf={setCompradorCpf} setCompradorNome={setCompradorNome} setLugar={setLugar} lugar={lugar}/>} />
            <Route path="/sucesso" element={<SuccessPage nomeDoFilme={nomeDoFilme} data={data} horário={horário} compradorCpf={compradorCpf} compradorNome={compradorNome} lugar={lugar} />} />
           </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
