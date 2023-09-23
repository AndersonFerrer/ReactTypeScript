import { Formik, Field, Form, FormikHelpers } from 'formik';
import { DetailUser } from '../interfaces/interface'
import '../App.css'
import { useState } from 'react';
import { Modal } from 'antd';


interface Props {
    newUser: DetailUser | undefined;
    setNewUser: React.Dispatch<React.SetStateAction<DetailUser | undefined>>;
    indexId: number,
    modalView: boolean,
    setModalView: React.Dispatch<React.SetStateAction<boolean>>
}
/* const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null); */
const config = {
    title: 'Se añadio Nuevo Usuario',
};


export default function MyApp(props: Props) {
    const [modal, contextHolder] = Modal.useModal();
    const [newId, setNewId] = useState(props.indexId)

    const handleSubmit = (
        values: DetailUser,
        { setSubmitting }: FormikHelpers<DetailUser>
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
    }
    console.log(props.modalView)

    return (
        <div className={`form__modal ${props.modalView ? 'form__modal__view' : ''}`}>
            <Formik
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
                    </div>
                    <div className='form__div'>
                        <label htmlFor="lastName">Nombre de Usuario</label>
                        <Field
                            className="form__input"
                            id="username"
                            name="username"
                            placeholder="Doe"
                        />
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
                    </div>
                    <div className='form__div'>
                        <label htmlFor="email">Direccion</label>
                        <div id='form__address'>
                            <Field
                                className="form__input"
                                id="address.street"
                                name="address.street"
                                placeholder="calle"
                            />
                            <Field
                                className="form__input"
                                id="address.suite"
                                name="address.suite"
                                placeholder="suite"
                            />
                        </div>
                        <div id='form__address'>
                            <Field
                                className="form__input"
                                id="address.zipcode"
                                name="address.zipcode"
                                placeholder="zipcode"
                            />
                            <Field
                                className="form__input"
                                id="address.city"
                                name="address.city"
                                placeholder="city"
                            />
                        </div>
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Celular</label>
                        <Field
                            className="form__input"
                            id="phone"
                            name="phone"
                            placeholder="phone"
                        />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Sitio Web</label>
                        <Field
                            className="form__input"
                            id="website"
                            name="website"
                            placeholder="sitio web"
                        />
                    </div>
                    <div className='form__div'>
                        <label htmlFor="firstName">Compañia</label>
                        <Field
                            className="form__input"
                            id="company.name"
                            name="company.name"
                            placeholder="compañia"
                        />
                    </div>
                    <button className='form__btn' type="submit">Agregar</button>
                </Form>
            </Formik>
            {contextHolder}
        </div>

    );
};