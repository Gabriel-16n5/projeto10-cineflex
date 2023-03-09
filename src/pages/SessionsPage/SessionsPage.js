import styled from "styled-components"
import React, { useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import axios from "axios";


export default function SessionsPage() {
    const [sessões, setSessões] = React.useState(null);
    const idFilme = useParams();
    useEffect(() => {
        
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme.idFilme}/showtimes`)
        promise.then((ok) => setSessões(ok.data))
    }, [])

    if (sessões === null){
        return <p>carregando</p>
    }
    else{

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <SessionContainer>
                {sessões.days.map((disponível) => 
                <><Text>{disponível.weekday} - {disponível.date}</Text>
                    <ButtonsContainer key={disponível.id}>
                       {disponível.showtimes.map((time) => <><Link to={`/assentos/${time.id}`}><button>{time.name}</button></Link></>)}
                    </ButtonsContainer>
                </>
                )}
                </SessionContainer>
                
            </div>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                </div>
            </FooterContainer>

        </PageContainer>
        )
    }
}
const Text = styled.p`
    width: 261px;
    height: 35px;
    left: 24px;
    top: 170px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    justify-content: flex-start;
    margin-right: 20px;
    align-items: center;
    letter-spacing: 0.02em;
    color: #293845;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
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