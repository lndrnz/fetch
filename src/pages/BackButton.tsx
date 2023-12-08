const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button className="logout_button" onClick={handleGoBack}>
      Back
    </button>
  );
};

export default BackButton;
