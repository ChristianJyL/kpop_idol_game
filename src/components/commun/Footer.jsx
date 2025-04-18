import React from 'react';
import '../../css/Footer.css';


export default function Footer() {
   
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className='footer-left'>
                    <h3>KWHO</h3>
                    <p>Your ultimate K-Pop database<br/>
                        Play games while learning about your favorite idols
                    </p>
                    </div>
                <div className='footer-right'>
                    <h3>CONTACT US</h3>
                    <p>30 rue Sainte IMAC, 75001 Paris France<br/>
                        +33 6 98 17 86 83 <br/>
                        contact@KWHO.com</p>

                    </div>
            </div>
        </div>
    );
}
