import { useSelector } from "react-redux";

const GraciasPage = () => {
    const email = useSelector(state => state.user.personalInfo.email);
    const userInfo = useSelector(state => state.user.personalInfo);
    const plans = useSelector(state => state.plan.plans);
    const total = useSelector(state => state.plan.totalSum);
    const carTotal = useSelector(state => state.plan.carSum);
    console.log(userInfo);
    console.log(plans);
    console.log('total: ' + total);
    console.log('carTotal: ' + carTotal);

    return (
        <div className="gracias-page-cont">
            <div className="wrapper">
                <div className="banner">
                    <picture>
                        <source media="(max-width: 600px)" srcSet={process.env.REACT_APP_IMAGE_CDN + 'ilustracion-gracias-mobile.png'} />
                        <source srcSet={process.env.REACT_APP_IMAGE_CDN + 'ilustracion-gracias.png'} />
                        <img className="banner__img" src={process.env.REACT_APP_IMAGE_CDN + 'ilustracion-gracias.png'} alt="Ilustracion Rimac"></img>
                    </picture>
                </div>

                <div className="content">
                    <div className="gracias">
                        <h2 className="gracias__subtitle">
                            ¡Te damos la bienvenida!
                        </h2>
                        <h1 className="gracias__title u-mb-10">
                            Cuenta con nosotros para protege tu vehículo
                        </h1>
                        <p className="gracias__text">
                            Enviaremos la confirmación de compra de tu Plan Vehícular Tracking a tu correo: 
                        </p>
                        <p className="gracias__email u-mb-40">{email}</p>
                        <div className="btn-como btn-gen btn-gen--red">
                            CÓMO USAR MI SEGURO
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraciasPage;