export const HeaderB = () => {


    return (
        <nav className="navbar container navbar-expand-lg ">
            <div className="container-fluid p-0">
                <a className="navbar-brand header_left font_Epilogue line_height_32 heading-24" href="#"><img src="06.png" className="logo"
                                                          alt="Logo"/>Trade Analyzer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto header_links font_poppins heading-16 text_gray">
                        <li className="nav-item">
                            <a className="nav-link text_gray font_weight_400 " aria-current="page" href="home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text_gray font_weight_400" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text_gray font_weight_400" href="#">Why Us?</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text_gray font_weight_400" href="#">Products</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link text_gray font_weight_400 dropdown-toggle" href="#"
                               id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Tools
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="calculators">Calculator</a></li>
                                {/*<li>*/}
                                {/*    <hr className="dropdown-divider"/>*/}
                                {/*</li>*/}
                            </ul>
                        </li>

                    </ul>
                    <form className="d-flex font_poppins btn_signup_signin  ">
                        <button className="btn bg-white text-primary  button_signup font_weight_500" type="submit">Sign Up!</button>
                        <button className="btn  text-white bg-primary-300 font_weight_500"  type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </nav>

    );
};
