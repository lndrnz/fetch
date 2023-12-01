const BackButton = () => {
    const handleGoBack = () => {
    window.history.back();
    };

    return (
        <button
            onClick={handleGoBack}
            className="heightNorm back-button media-button none"
        >
            Back
        </button>
    );
};

export default BackButton;