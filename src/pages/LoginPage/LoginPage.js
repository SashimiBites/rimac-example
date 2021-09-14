import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { useFormik, Field, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { userActions } from '../../store/user/user-slice';
import { allowOnlyNumbers } from '../../lib/utils';

// Dummy Select Info 
const documentOptions = [
    { value: 'dni', label: 'DNI' },
    { value: 'ce', label: 'CE'}
];

// Yup validation Schema
const errorString = 'Campo obligatorio';
const formValidation = Yup.object({
    documentType: Yup.string()
    .required(),
    documentNumber: Yup.number()
    .positive()
    .integer()
    .required(errorString),
    phone: Yup.number()
    .positive()
    .integer()
    .required(errorString),
    plate: Yup.string()
    .required(errorString),
    terms: Yup.boolean()
    .oneOf([true], 'Acepta los términos para continuar')
});

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            documentType: 'dni',
            documentNumber: '',
            phone: '',
            plate: '',
            terms: false
        },
        validationSchema: formValidation,
        onSubmit: async (values) => {
            //fetch user info from api
            let userFetchInfo;
            try {
                userFetchInfo = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            } catch (error) {
                if(error) {
                    throw new Error('there was an error trying to fetch users');
                }
            }

            const userInfo = {
                documentType: values.documentType,
                documentNumber: values.documentNumber,
                phone: values.phone,
                name: userFetchInfo.data.username,
                email: userFetchInfo.data.email
            };

            //dispatch action to user store
            dispatch(userActions.addUserInfo({
                personalInfo: userInfo,
                plate: values.plate
            }));

            //if successful redirect to next page
            history.replace('/datos');
        }
    });

    return (
        <div className="login-page-cont">
            <div className="wrapper">
                <div className="banner">
                    <img className="banner__image-desktop u-mb-25" src={process.env.REACT_APP_IMAGE_CDN + 'ilustracion-rimac.svg'} alt="imagen seguro rimac"></img>
                    <img className="banner__image-mobile u-mb-25" src={process.env.REACT_APP_IMAGE_CDN + 'ilustracion-rimac-mobile.svg'} alt="imagen seguro rimac"></img>
                    <div className="banner__cont">
                        <p className="subtitle u-mb-5">¡NUEVO!</p>
                        <h1 className="title u-mb-15">
                            Seguro Vehicular <span className="red">Tracking</span>
                        </h1>
                        <p className="text">
                            Cuentanos donde le haras seguimiento a tu seguro
                        </p>
                    </div>
                </div>
                
                <div className="content">
                    <FormikProvider value={formik}>
                    <form className="login-form form-gen" onSubmit={formik.handleSubmit}>
                        <h1 className="login-form__title u-mb-25">Déjanos tus datos</h1>
                        
                        <div className="form-gen__mixed u-mb-15">
                            <div className="form-gen__group">
                                <Select 
                                className="select-type1"
                                classNamePrefix="select-type1"
                                options={documentOptions}
                                onChange={value => formik.setFieldValue('documentType', value.value)}
                                value={documentOptions ? documentOptions.find(option => option.value === formik.values.documentType) : ''}
                                />
                                {formik.touched.documentType && formik.errors.documentType ? (
                                    <div className="form-gen__error">{formik.errors.documentType}</div>
                                ) : null}
                            </div>

                            <div className="form-gen__group">
                                <div className="form-gen__input-gen">
                                    <input 
                                    id="documentNumber"
                                    type="text"
                                    onChange={e => allowOnlyNumbers(e, formik.setFieldValue, 'documentNumber')}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.documentNumber}
                                    placeholder="o"
                                    autoComplete="off"/>
                                    <label className="form-gen__label" htmlFor="documentNumber">Nro. de documento</label>
                                </div>
                                {formik.touched.documentNumber && formik.errors.documentNumber ? (
                                    <div className="form-gen__error">{formik.errors.documentNumber}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="form-gen__group u-mb-15">
                            <div className="form-gen__input-gen">
                                <input 
                                id="phone"
                                type="text"
                                onChange={e => allowOnlyNumbers(e, formik.setFieldValue, 'phone')}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                placeholder="o"
                                autoComplete="off"/>
                                <label className="form-gen__label" htmlFor="phone">Celular</label>
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="form-gen__error">{formik.errors.phone}</div>
                            ) : null}
                        </div>

                        <div className="form-gen__group u-mb-15">
                            <div className="form-gen__input-gen">
                                <input 
                                id="plate"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.plate}
                                placeholder="o"
                                autoComplete="off"/>
                                <label className="form-gen__label" htmlFor="plate">Placa</label>
                            </div>
                            {formik.touched.plate && formik.errors.plate ? (
                                <div className="form-gen__error">{formik.errors.plate}</div>
                            ) : null}
                        </div>

                        <div className="form-gen__terms-cont u-mb-40">
                            <label className="label" htmlFor="terms_checkbox">
                                <Field 
                                id="terms_checkbox"
                                type="checkbox" 
                                name="terms"/>
                                <span className="checkbox"></span>
                                <p className="text">
                                    Acepto la 
                                    <a href="#"> Política de Protecciòn de Datos Personales</a>
                                    &nbsp;y los
                                    <a href="#"> Términos y Condiciones</a>.
                                </p>
                            </label>
                            {formik.touched.terms && formik.errors.terms ? (
                                <div className="form-gen__error">{formik.errors.terms}</div>
                            ) : null}
                        </div>

                        <button 
                            className="btn-cotizar btn-gen btn-gen--red" 
                            type="submit">
                                COTÍZALO
                        </button>
                    </form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;