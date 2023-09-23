import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { DetailUser } from "../interfaces/interface";
import '../App.css'
import { FaArrowLeft } from 'react-icons/fa'
import { IconContext } from "react-icons";
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

export default function UserDetail() {
    const { id } = useParams()
    const [detailUser, setDetailUser] = useState<DetailUser>()
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        const dataLS = localStorage.getItem('users')
        const dataLSCache: DetailUser[] = dataLS && JSON.parse(dataLS)
        console.log(dataLSCache)
        const filterUser = dataLSCache?.find((user) => user.id.toString() === id)
        setDetailUser(filterUser)
        console.log(filterUser)
        fetch(`https://ui-avatars.com/api/?name=${filterUser?.name}&background=random`)
            .then(res => {
                setAvatar(res.url)
            })
    }, [id])
    console.log(avatar)
    console.log(detailUser)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Usuario',
            children: <p>{detailUser?.username}</p>,


        },
        {
            key: '2',
            label: 'Telefono',
            children: detailUser?.phone,

        },
        {
            key: '3',
            label: 'Sitio Web',
            children: detailUser?.website,
        },
        {
            key: '4',
            label: 'Direccion',
            children: `${detailUser?.address.street} ${detailUser?.address.suite}, ${detailUser?.address.city}`,

        },
        {
            key: '5',
            label: 'Codigo Postal',
            children: detailUser?.address.zipcode,

        },
        {
            key: '6',
            label: 'Compañia',
            children: detailUser?.company.name,

        },
    ];

    return (
        <section className="container__childrens">
            <div>
                <IconContext.Provider value={{ className: "btnBack__icon" }}>
                    <Link className="btnBack" to='/'><FaArrowLeft />Volver</Link>
                </IconContext.Provider>
                <div className="detail__user">
                    <div className="detail__user__avatar">
                        <img src={avatar} className="avatar" alt={detailUser?.name} />
                        <h1 className="detail__user__title">{detailUser?.name}</h1>
                    </div>
                    <h1 className="detail__user__subtitle">Informacion de Usuario:</h1>
                    <Descriptions labelStyle={{ color: 'white', fontSize: 20, fontWeight: 500 }} contentStyle={{ color: 'gray', fontSize: 16, }} size="middle" layout="vertical" items={items} />


                </div>
            </div>

        </section >
    )
}
