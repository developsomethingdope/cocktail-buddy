import NavLinks from "../components/NavLinks";

function ErrorPage() 
{
  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="homeLink" /></div>
        <div className="title">Error</div>  
      </div>
      <div className="page-bottom section-error">
        <div className="section-subtitle">Something wrong here</div>
        <p>It's okay. Just click on any of the links above to continue.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
