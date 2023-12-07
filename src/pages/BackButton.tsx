const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
    >
      Back
    </button>
  );
};

export default BackButton;
