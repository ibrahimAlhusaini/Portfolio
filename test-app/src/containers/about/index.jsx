import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import {FaDev, FaDatabase,FaLaptopCode} from "react-icons/fa"
import {DiPython} from "react-icons/di"
import PageHeaderContent from "../../components/pageHeaderContent";
import { Animate } from 'react-simple-animate';
import './styles.scss'


const personalDetails = [
    {
        label: "Name",
        value: "Ibrahim Adnan Alhusaini"
    },
    {
        label: "Age",
        value: "23"
    },
    {
        label: "Address",
        value: "Dammam, Saudi Arabia"
    },
    {
        label: "Email",
        value: "ibrahimalhusaini21@gmail.com"
    },
];

const jobSummary = "Computer Science graduate with hands-on experience in machine learning, data preprocessing, predictive modeling, and web development. Built ML pipelines for DDoS detection and encrypted network-traffic classification, evaluating models including Random Forest, XGBoost, SVM, and neural networks. Proficient in Python, SQL, Scikit-learn, Pandas, Power BI, React, and Vue.js."








const About = () => {
    return (
        <section className="about" id="about">
            <PageHeaderContent
                headerText='About me'
                icon={<BsInfoCircleFill size={49} />}
            />

            <div className="about__content">
                <div className="about__content__personalWrapper">
                    <Animate
                        play
                        duration={1.5}
                        delay={0.2}
                        start={{
                            transform: 'translateX(-900px)'
                        }}
                        end={{
                            transform: 'translatex(0px)'
                        }}
                    >

                        <h3> Data Scientist, AI Engineer, and Web Developer. </h3>
                        <p>{jobSummary}</p>


                    </Animate>

                    <Animate
                        play
                        duration={1.5}
                        delay={0.2}
                        start={{
                            transform: 'translateX(500px)'
                        }}
                        end={{
                            transform: 'translatex(0px)'
                        }}
                    >

                        <h3 className="peronalInformationHeaderText"> Personal Information </h3>
                        <ul>
                            {
                                personalDetails.map((item, i) => (
                                    <li className="presonalInfo" key={i}>
                                        <span className="title">{item.label} </span>
                                        <span className="value">{item.value} </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </Animate>
                </div>

               
                <div className="about__content__servicesWrapper">

                <Animate
                        play
                        duration={1.5}
                        delay={0.2}
                        start={{
                            transform: 'translateX(600px)'
                        }}
                        end={{
                            transform: 'translatex(0px)'
                        }}
                    >
                    <div className="about__content__servicesWrapper__innerContent">
                        <div>
                            <FaDev size={60} color="var(--yellow-theme-main-color)" />
                        </div>
                        <div>
                            <DiPython size={60} color="var(--yellow-theme-main-color)" />
                        </div>
                        <div>
                            <FaDatabase size={60} color="var(--yellow-theme-main-color)" />
                        </div>
                        <div>
                            <FaLaptopCode size={60} color="var(--yellow-theme-main-color)" />
                        </div>
                    </div>
                    </Animate>
                </div>

            </div>
        </section>
    )
}

export default About;
