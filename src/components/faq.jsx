'use strict'
import React from 'react';
function Faq() {
    return (
        <div className="row faq">
            <nav className="sm-col-span-12 lg-col-span-3 faq-nav">
                <h2>FAQ</h2>
                <div className="faq-nav-divider"></div>
            </nav>
            <article className="lg-col-span-9 faq-article">
                <h3>Shipping & Delivery</h3>
                <p>We provide free shipping to anywhere in Australia via Australia Post</p>
                <p>All deliveries should arrive within 3 to 5 working days (except WA & TAS, which could 
                take up to 7 working days) from your date of order. If your product has not arrived within this time frame, 
                you can track your order using the Australia Post tracking number provided to you via email.</p>
                <p>We do not currently ship internationally? You’ll only be able to process an order on our site if your 
                shipping and billing addresses are in Australia.</p>
                <h3>Exchanges & Returns</h3>
                <p>If you wish to return an item simply because you change your mind, we will gladly exchange or refund, provided 
                that the item is in original condition, unworn and with tags still attached. In the interests of hygiene and 
                for your protection we do not accept returns of, or provide refunds for pierced earrings, packs containing earrings, 
                body jewellery and hair accessories unless the items are of unsatisfactory quality.</p>
                <p>If you’d like a refund or exchange then you will be expected to pay for shipping the item back to us. We do not 
                cover postage costs for returning items.</p>
                <h3>Payments</h3>               
                <p>The PayPal method we use will also accept payments by Visa, Mastercard and Amex.</p>
                <p>We take your personal security seriously. Transactions occur within the PayPal environment 
                and are protected by their leading security and 24/7 monitoring. PayPal are one of the most trusted 
                internet payment systems in the world.</p>
                <p>PayPal was created to provide the public with a safe and secure way to send money through the internet. 
                Setting up a PayPal account is free and easy. Just visit their site and follow the directions to sign up.</p>                
                <p>Once your payment has been processed you’ll immediately receive a confirmation email via PayPal.</p>                 
            </article>
        </div>
    );
}
export default Faq;
  