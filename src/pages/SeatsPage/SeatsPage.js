import styled from "styled-components"
import React, { useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import axios from "axios";


export default function SeatsPage() {
    const [assento, setAssento] = React.useState(null);
    const sessão = useParams();
    const [situaçãoAssento, setSituaçãoAssento] = React.useState("")
    const [situaçãoAssentoAux, setSituaçãoAssentoAux] = React.useState("")

    function trocaCor(posição){
        console.log(posição)
        setSituaçãoAssento([...situaçãoAssento, posição]);
        setSituaçãoAssentoAux([...situaçãoAssentoAux, posição])
        if(posição.isAvailable === false){
            alert("Esse está ocupado")
        }
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessão.idSessao}/seats`)
        promise.then((ok) => setAssento(ok.data))
        // promise.then((ok) => console.log(ok.data))

    }, [])
    
    if (assento === null){
        return <p>carregando</p>
    }
    else{
        const {id, name, day: {weekday}, movie: {title, posterURL} } = assento;
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assento.seats.map((posição) => 
                <SeatItem onClick={(() => trocaCor(posição))} data-test="seat" color={posição.isAvailable === false ? "#FBE192" : "" || situaçãoAssento.includes(posição)? "#1AAE9E" : "#C3CFD9"} border={situaçãoAssentoAux.includes(posição)? "Black" : "Green"} key={posição.id}>{posição.name}</SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color={"#1AAE9E"} border={"Green"} data-test="seat" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={"#7B8B99"} data-test="seat" />
                    Disponível  
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={"#FBE192"} border={"Orange"} data-test="seat" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." />

                <Link to="/sucesso"><button data-test="book-seat-btn" >Reservar Assento(s)</button></Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{`${weekday} - ${name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid gray;
    background-color:  ${props => props.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    :hover {
        border: 1px solid ${props => props.border};  
    }
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid gray;
    background-color: ${props => props.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    :hover{
        border: 1px solid ${props => props.border};
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`