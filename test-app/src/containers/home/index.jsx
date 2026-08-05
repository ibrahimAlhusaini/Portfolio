import React from "react";
import './styles.scss'
import { useNavigate } from "react-router-dom";
import { Animate } from 'react-simple-animate';
import SocialLinks from "../../components/SocialLinks";

const Home = () => {


    const navigate = useNavigate();
    console.log(navigate)




    return (
        <section id="home" className="home">
            <div className="home__text-wrapper">
                <h1>
                    Hello, I'm Ibrahim Alhusaini
                    <br/>
                    I am a Computer Science graduate with a strong interest in AI, Data Science, and Machine Learning, supported by academic projects and practical experience in software and web development. 
                    <br/>
                    with a solid background in the fundamentals 
                    <br/>
                   I am passionate about building data-driven solutions, contributing to impactful work, and continuously developing my technical and professional skills in an innovative environment.
                </h1>
            </div>

           
            <Animate
                play
                duration={1.5}
                delay={1}
                start={{
                    transform: 'translateX(-700px)'
                }}
                end={{
                    transform: 'translateX(0px)'
                }}
            >
                <SocialLinks />  </Animate>
        </section>
    )
}

export default Home;
