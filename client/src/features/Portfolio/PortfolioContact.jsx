


export default function PortfolioContact() {
    const emailAddress = `mahamajama@gmail.com`;

    function handleCopyEmail() {
         navigator.clipboard.writeText(emailAddress);
    }

    return (
        <section id="portfolio-contact">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Contact</h1>
                <div className="contact-listing">
                    <p>email -:: </p>
                    <div className="contact-listing-link">
                        <a href={`mailto:${emailAddress}`}>
                            {`${emailAddress} `} 
                            <button onClick={handleCopyEmail}>copy</button>
                        </a> 
                    </div>
                </div>
                <div className="contact-listing">
                    <p>github -:: </p>
                    <div className="contact-listing-link">
                        <a href="https://github.com/mahamajama" target="_blank">github.com/mahamajama</a>
                    </div>
                </div>
                <div className="contact-listing">
                    <p>linkedin -:: </p>
                    <div className="contact-listing-link">
                        <a href="https://www.linkedin.com/in/joey-rose/" target="_blank">
                            linkedin.com/in/joey-rose
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}