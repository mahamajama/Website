


export default function PortfolioContact() {
    const emailAddress = `mahamajama@gmail.com`;

    function handleCopyEmail() {
         navigator.clipboard.writeText(emailAddress);
    }

    return (
        <section id="portfolio-contact">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Contact</h1>
                <p>email -:: <a href={`mailto:${emailAddress}`}>{emailAddress}</a> <button onClick={handleCopyEmail}>copy</button></p>
                <p>github -:: <a href="https://github.com/mahamajama" target="_blank">github.com/mahamajama</a></p>
                <p>linkedin -:: <a href="https://www.linkedin.com/in/joey-rose/" target="_blank">linkedin.com/in/joey-rose</a></p>
            </div>
        </section>
    );
}