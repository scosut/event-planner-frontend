const Welcome = () => {
    return (
        <>
            <div id="welcome" className="fadeInRight">
                <h3>Welcome!</h3>

                <p>
                    Twice a year, individuals attending the weekly social
                    gatherings at Hillcrest Lodge in Mount Vernon, WA plan a
                    getaway to Harrison Hot Springs for two nights of dinner and
                    dancing.
                </p>

                <p>
                    This website enables the event coordinator to prepare a
                    participant list, seating chart, and table decorations for
                    the festivities.
                </p>

                <img
                    src={`${import.meta.env.BASE_URL}images/swirl.png`}
                    alt="swirls"
                />
            </div>
            <div className="flex-grow-1"></div>
        </>
    );
};

export default Welcome;
