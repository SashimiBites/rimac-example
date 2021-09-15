import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import planes from './planes';
import StepProgressDesktop from "../../components/StepProgress/StepProgressDesktop";
import StepProgressMobile from "../../components/StepProgress/StepProgressMobile";
import PlanAccor from "../../components/PlanAccor/PlanAccor";

const MONTO_BASE = 20;
const appSteps = [
    'Datos del auto',
    'Arma tu plan'
];
const carInfo = {
    carBrand: 'Wolkswagen',
    carYear: '2019'
};

const PlanPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const plate = useSelector(state => state.user.plate);

    const cPlansArray = [];
    const cAllPlans = [];
    planes.forEach((el) => {
        const currentPlanId = el.id;
        const newObj = {
            id: currentPlanId,
            isSelected: el.isSelected
        };
        cPlansArray.push(newObj);

        el.planOptions.forEach(el2 => {
            cAllPlans.push({
                parentId: currentPlanId,
                ...el2
            });
        });
    });

    const [plansArray, setPlansArray] = useState(cPlansArray);
    const [allPlans, setAllPlans] = useState(cAllPlans);
    const [currentPlanId, setCurrentPlanId] = useState(cPlansArray[0].id);
    const [montoTotal, setMontoTotal] = useState(MONTO_BASE);
    const [currentOptions, setCurrentOptions] = useState([]);

    const clickPlanHandle = (id) => {
        const cPlan = plansArray.find(el => el.id === id);
        plansArray.forEach((el) => {
            el.isSelected = false;
        });
        cPlan.isSelected = true;
        setCurrentPlanId(cPlan.id);
        setPlansArray([...plansArray]);
    };

    const addPlanOptionHandle = (id) => {
        const option = allPlans.find(el => el.id === id);
        option.added === false ? setMontoTotal(montoTotal + option.cost) : setMontoTotal(montoTotal - option.cost);
        option.added = !option.added;

        if(option.added) {
            currentOptions.push(option.id);
        } else {
            const index = currentOptions.indexOf(option.id);
            currentOptions.splice(index, 1);
        }

        setCurrentOptions([...currentOptions]);
    };

    return (
        <div className="planes-page-cont">
            <div className="wrapper">
                <div className="banner">
                    <StepProgressDesktop  
                    steps={appSteps}
                    currentStep={2}/>

                    <Link to="/datos" className="btn-back" replace>
                        <img src={process.env.REACT_APP_IMAGE_CDN + 'icon-back.png'} alt="icono volver"/>
                    </Link>

                    <StepProgressMobile  
                    steps={appSteps}
                    currentStep={2}/>
                </div>

                <div className="content">
                    <div className="content__left">
                        <Link to="/" className="back u-mb-30" replace>
                            <div className="back__btn">
                                <img src={process.env.REACT_APP_IMAGE_CDN + 'icon-back.png'} alt="icono volver"/>
                            </div>
                            <p className="back__text">VOLVER</p>
                        </Link>

                        <h1 className="title u-mb-5">
                            Mira las coberturas
                        </h1>
                        <p className="subtitle u-mb-40">
                            Conoce las coberturas para tu plan
                        </p>

                        <div className="user-card u-mb-60">
                            <div className="user-card__car-info">
                                <p className="user-card__plate">Placa: {plate}</p>
                                <h4 className="user-card__title">
                                    {carInfo.carBrand} {carInfo.carYear} Golf
                                </h4>
                            </div>

                            <div className="user-card__img">
                                <img src={process.env.REACT_APP_IMAGE_CDN + 'card-ilustration.png'} alt="Imagen del usuario"/>
                            </div>
                        </div>

                        <div className="counter u-mb-20">
                            <div className="counter__des">
                                <p className="counter__title">
                                    Indica la suma asegurada
                                </p>
                                <div className="counter__subtitle">
                                    <p>MIN $12.500</p>
                                    <div className="counter__sep"></div>
                                    <p>MAX $16.500</p>
                                </div>
                            </div>

                            <div className="counter__count">
                                <button
                                    type="button" 
                                    onClick={() => {}}
                                    className="counter__count-btn">-</button>
                                <p className="counter__number">{'$ ' + 2000}</p>
                                <button 
                                    type="button" 
                                    onClick={() => {}}
                                    className="counter__count-btn">+</button> 
                            </div>
                        </div>

                        <div className="separation"></div>

                        <p className="menu-title u-mb-30">
                            Agrega o quita coberturas
                        </p>

                        <div className="plans">
                            <div className="plans__top">
                                <div 
                                    onClick={() => clickPlanHandle(plansArray[0].id)} 
                                    className={'plans__option ' + (plansArray[0].isSelected === true ? 'selected' : '')}>
                                    PROTEGE A TU AUTO
                                </div>
                                <div 
                                    onClick={() => clickPlanHandle(plansArray[1].id)} 
                                    className={'plans__option ' + (plansArray[1].isSelected === true ? 'selected' : '')}>
                                    PROTEGE A LOS QUE TE RODEAN
                                </div>
                                <div 
                                    onClick={() => clickPlanHandle(plansArray[2].id)} 
                                    className={'plans__option ' + (plansArray[2].isSelected === true ? 'selected' : '')}>
                                    MEJORA TU PLAN
                                </div>
                            </div>

                            <div className="plans__bot">
                                {
                                    allPlans.filter(el => el.parentId === currentPlanId).map((el, key) => {
                                        return (
                                            <PlanAccor 
                                                key={'planOpt-' + key}
                                                id={el.id}
                                                compKey={key}
                                                img={el.img}
                                                title={el.title}
                                                added={el.added}
                                                description={el.description}
                                                clickPlanHandle={addPlanOptionHandle}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="content__right">
                        <div className="checkout">
                            <div className="checkout__top">
                                <div className="checkout__price-cont">
                                    <p className="checkout__price">
                                        ${montoTotal.toFixed(2)}
                                    </p>
                                    <p className="checkout__month">
                                        mensuales
                                    </p>
                                </div>

                                <div className="checkout__badge">
                                    <img src={process.env.REACT_APP_IMAGE_CDN + 'badge.svg'} alt="icono"/>
                                </div>
                            </div>

                            <div className="checkout__bot">
                                <p className="checkout__title">
                                    El precio incluye:
                                </p>
                                <ul className="checkout__list">
                                    <li className="checkout__list-item">
                                        Llanta de repuesto
                                    </li>
                                    <li className="checkout__list-item">
                                        Análisis de motor
                                    </li>
                                    <li className="checkout__list-item">
                                        Aros gratis
                                    </li>
                                </ul>
                                <button 
                                    className="checkout__last-btn btn-gen btn-gen--red">
                                    LO QUIERO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanPage;