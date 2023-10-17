import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { CgMail } from "react-icons/cg"
const Footer = () => {
    return (
        <footer className="footer-container">
            <div id="footer-top">
                <div id="slide1">
                    <div id="desc">
                        <div>PMS (Product Management System)</div>
                        <div className='description'>
                            A project management system (PMS) is a combination of methodologies and technologies that assist you with the planning, organizing, and scheduling of everything that contributes to the success of a project.
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/Asif45uaha"><FaGithub size={30} color='white' /></a>
                        <a href="https://www.linkedin.com/in/aasif-ali-6909b8200"><FaLinkedin size={30} color='white' /></a>
                        <a href="https://www.instagram.com/_asif_ali10"><FaInstagram size={30} color='white' /></a>
                        <a href="mailto:asif15310@gmail.com"><CgMail size={35} color='white' /></a>
                    </div>

                </div>
            </div>
            <div className='footer-bottom'>developed by @Aasif Ali</div>
        </footer>
    )
}
export default Footer