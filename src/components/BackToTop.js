function BackToTop() 
{
  function topOnClickHandler()
  {
    window.scrollTo(
    {
      top: 0,
      behavior: 'smooth'
    });
  }
  
  return (
    <div className="button button-top" onClick={topOnClickHandler}>Back to top</div>
  );
}

export default BackToTop;
