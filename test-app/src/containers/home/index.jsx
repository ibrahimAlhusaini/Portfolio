import React from "react";
import "./styles.scss";
import { Animate } from "react-simple-animate";
import SocialLinks from "../../components/SocialLinks";

const Home = () => {
    return (
        <section id="home" className="home">
            <div className="home__text-wrapper">
                <h1>Hello, I'm Ibrahim Alhusaini</h1>

                <p>
                    I am a Computer Science graduate with a strong interest in AI,
                    Data Science, and Machine Learning, supported by academic
                    projects and practical experience in software and web development.
                </p>

                <p>
                    I have a solid background in the fundamentals and I am passionate
                    about building data-driven solutions, contributing to impactful
                    work, and continuously developing my technical and professional
                    skills in an innovative environment.
                </p>
            </div>

            <Animate
                play
                duration={1.5}
                delay={1}
                start={{
                    transform: "translateX(-700px)",
                }}
                end={{
                    transform: "translateX(0px)",
                }}
            >
                <div className="home__social-links">
                    <SocialLinks />
                </div>
            </Animate>
        </section>
    );
};

export default Home;
