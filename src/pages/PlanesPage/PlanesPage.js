import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import planes from './planes';
import StepProgressDesktop from "../../components/StepProgress/StepProgressDesktop";
import StepProgressMobile from "../../components/StepProgress/StepProgressMobile";
import PlanAccor from "../../components/PlanAccor/PlanAccor";
import { planActions } from "../../store/plan/plan-slice";

const MONTO_BASE = 20;
const appSteps = [
    'Datos del auto',
    'Arma tu plan'
];
const carInfo = {
    carBrand: 'Wolkswagen',
    carYear: '2019'
};

// PRICE CONSTANT
const MIN_AMOUNT = 12500; 
const MAX_AMOUNT = 16500;
const AMOUNT_TO_CHANGE = 12600;
const INCREMENT_AMOUNT = 100;

const usePriceCounter = (initialAmount) => {
    const [sum, setSum] = useState(initialAmount);

    const incrementSum = () => {
        sum + INCREMENT_AMOUNT > MAX_AMOUNT ? setSum(sum) : setSum(sum + INCREMENT_AMOUNT);
    };

    const decrementSum = () => {
        sum - INCREMENT_AMOUNT < MIN_AMOUNT ? setSum(sum) : setSum(sum - INCREMENT_AMOUNT);
    };

    return { sum, incrementSum, decrementSum };
};

const PlanPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const plate = useSelector(state => state.user.plate);
    const { sum, incrementSum, decrementSum } = usePriceCounter(MIN_AMOUNT); 

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
    const [montoTotal, setMontoTotal] = useState(0);

    const clickPlanHandle = (id) => {
        const cPlan = plansArray.find(el => el.id === id);
        plansArray.forEach((el) => {
            el.isSelected = false;
        });
        cPlan.isSelected = true;
        setCurrentPlanId(cPlan.id);
        setPlansArray([...plansArray]);
    };

    const addOrRemovePlanOptionHandle = (id) => {
        const option = allPlans.find(el => el.id === id);
        option.added === false ? setMontoTotal(montoTotal + option.cost) : setMontoTotal(montoTotal - option.cost);
        
        const newAllPlans = [...allPlans];
        const index = allPlans.findIndex(el => el.id === id);
        newAllPlans[index].added = !newAllPlans[index].added;

        setAllPlans(newAllPlans);
    };

    const updateCost = () => {
        const acceptedPlans = allPlans.filter(el => el.added);
        const accum = acceptedPlans.length === 0 ? 0 : acceptedPlans.map(el => el.cost).reduce((el, acc) => acc += el);
        setMontoTotal(accum + MONTO_BASE);
    };

    useEffect(() => {
        updateCost();
    }, []);

    useEffect(() => {
        const hidePlanOption = (hide, id) => {
            const newAllPlans = [...allPlans];
            const index = allPlans.findIndex(el => el.id === id);
            
            if(hide) {
                newAllPlans[index].hide = true;
                if(newAllPlans[index].added) newAllPlans[index].added = false;
            } else {
                newAllPlans[index].hide = false;
                if(!newAllPlans[index].added) newAllPlans[index].added = true;
            }
    
            setAllPlans(newAllPlans);
            updateCost();
        };

        if(sum > AMOUNT_TO_CHANGE && !allPlans[1].hide) {
            hidePlanOption(true, allPlans[1].id);
        } else if(sum <= AMOUNT_TO_CHANGE && allPlans[1].hide) {
            hidePlanOption(false, allPlans[1].id);
        }
    }, [allPlans, sum]);

    const goToLastPageHandle = () => {
        // dispatch action to plan store
        const currentOptions = allPlans.filter(el => el.added);
        dispatch(planActions.createPlans({
            plans: currentOptions
        }));
        dispatch(planActions.addTotalSum({
            totalSum: montoTotal
        }));
        dispatch(planActions.addCarSum({
            carSum: sum
        }));

        // go to last page
        history.replace('/gracias');
    }

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
                                    onClick={decrementSum}
                                    className="counter__count-btn">-</button>
                                <p className="counter__number">{'$ ' + sum}</p>
                                <button 
                                    type="button" 
                                    onClick={incrementSum}
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
                                        return !el.hide ?
                                        (
                                            <PlanAccor 
                                                key={'planOpt-' + key}
                                                id={el.id}
                                                compKey={key}
                                                img={el.img}
                                                title={el.title}
                                                added={el.added}
                                                description={el.description}
                                                clickPlanHandle={addOrRemovePlanOptionHandle}
                                            />
                                        ) : null;
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
                                    onClick={goToLastPageHandle}
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