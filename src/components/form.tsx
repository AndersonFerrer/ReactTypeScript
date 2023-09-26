import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { DetailUser } from '../interfaces/interface'
import '../App.css'
import { useState } from 'react';
import { Modal } from 'antd';
import * as Yup from 'yup'


interface Props {
    newUser: DetailUser | undefined;
    setNewUser: React.Dispatch<React.SetStateAction<DetailUser | undefined>>;
    indexId: number,
    modalView: boolean,
    setModalView: React.Dispatch<React.SetStateAction<boolean>>
}
const config = {
    title: 'Se añadio Nuevo Usuario',
};


export default function MyApp(props: Props) {
    const [modal, contextHolder] = Modal.useModal();
    const [newId, setNewId] = useState(props.indexId)
    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es requerido'),
        username: Yup.string().required('El nombre de usuario es requerido'),
        email: Yup.string().email('Correo electrónico no válido')
            .required('El correo electrónico es obligatorio').test('email-exists', 'Este correo ya está registrado', async function (value) {
                // Consulta la lista de usuarios en localStorage para verificar si el correo ya existe
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                console.log(!users.some((user: DetailUser) => user.email === value))
                return !users.some((user: DetailUser) => user.email === value);
            }),
        address: Yup.object({
            street: Yup.string().required('La calle es requerida'),
            suite: Yup.string().required('La suite es requerida'),
            city: Yup.string().required('La ciudad es requerida'),
            zipcode: Yup.string().matches(/^[0-9]+$/, 'Ingresar solo numeros').required('El zipcode es requerido'),
        }),
        phone: Yup.string().matches(/^[0-9]+$/, 'Ingresar solo numeros').required('El celular es requerido'),
        website: Yup.string().required('El sitio web es requerido'),
        company: Yup.object({
            name: Yup.string().required('La compañia es requerida'),
        })
    })

    const handleSubmit = (
        values: DetailUser,
        { setSubmitting, resetForm }: FormikHelpers<DetailUser>
    ) => {

        const id = newId + 1
        values.id = id
        console.log(id)
        props.setNewUser({
            id: id,
            name: values.name,
            username: values.username,
            email: values.email,
            address: {
                street: values.address.street,
                suite: values.address.suite,
                city: values.address.city,
                zipcode: values.address.zipcode,
            },
            phone: values.phone,
            website: values.website,
            company: {
                name: values.company.name
            }
        })
        modal.info(config);
        setSubmitting(false)
        setNewId(id)
        props.setModalView(false)
        resetForm()

    }
    console.log(props.modalView)

    return (
        <div className={`form__modal ${props.modalView ? 'form__modal__view' : ''}`}>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    id: newId + 1,
                    name: '',
                    username: '',
                    email: '',
                    address: {
                        street: '',
                        suite: '',
                        city: '',
                        zipcode: '',
                    },
                    phone: '',
                    website: '',
                    company: {
                        name: ''
                    }
                }}
                onSubmit={handleSubmit}
            >
                <Form className='form__container'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Añadir usuario:</h1>
                        <button className='form__cancel__btn' type='button' onClick={() => props.setModalView(false)}>x</button>
                    </div>

                    <div className='form__div'>
                        <label htmlFor="firstName">Nombre</label>
                        <Field
                            className="form__input"
                            id="name"
                            name="name"
                            placeholder="John"
                        />
                        <ErrorMessage className='text-danger' name="name" component="div" />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="lastName">Nombre de Usuario</label>
                        <Field
                            className="form__input"
                            id="username"
                            name="username"
                            placeholder="Doe"
                        />
                        <ErrorMessage className='text-danger' name="username" component="div" />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="email">Email</label>
                        <Field
                            className="form__input"
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            type="email"
                        />
                        <ErrorMessage className='text-danger' name="email" component="div" />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="email">Direccion</label>
                        <div id='form__address'>
                            <Field
                                className="form__input"
                                id="address.street"
                                name="address.street"
                                placeholder="Calle"
                            />
                            <ErrorMessage className='text-danger' name="address.street" component="div" />
                            <Field
                                className="form__input"
                                id="address.suite"
                                name="address.suite"
                                placeholder="Suite"
                            />
                            <ErrorMessage className='text-danger' name="address.suite" component="div" />
                        </div>
                        <div id='form__address'>
                            <Field
                                className="form__input"
                                id="address.zipcode"
                                name="address.zipcode"
                                placeholder="Codigo Postal"
                            />
                            <ErrorMessage className='text-danger' name="address.zipcode" component="div" />
                            <Field
                                className="form__input"
                                id="address.city"
                                name="address.city"
                                placeholder="Ciudad"
                            />
                            <ErrorMessage className='text-danger' name="address.city" component="div" />
                        </div>
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Celular</label>
                        <Field
                            className="form__input"
                            id="phone"
                            name="phone"
                            placeholder="Celular"
                        />
                        <ErrorMessage className='text-danger' name="phone" component="div" />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Sitio Web</label>
                        <Field
                            className="form__input"
                            id="website"
                            name="website"
                            placeholder="Sitio Web"
                        />
                        <ErrorMessage className='text-danger' name="website" component="div" />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Compañia</label>
                        <Field
                            className="form__input"
                            id="company.name"
                            name="company.name"
                            placeholder="Nombre de compañia"
                        />
                        <ErrorMessage className='text-danger' name="company.name" component="div" />
                    </div>
                    <button className='form__btn' type="submit">Agregar</button>
                </Form>
            </Formik>
            {contextHolder}
        </div>

    );
};