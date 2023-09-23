import { useEffect, useState } from 'react'
import { DetailUser, User } from '../interfaces/interface'
import '../App.css'
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MyApp from '../components/form';

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [newUser, setNewUser] = useState<DetailUser>()
    const [modalView, setModalView] = useState(false);
    const [indexId, setIndexId] = useState((): number => {
        // Calcula la longitud inicial del array en el localStorage
        const data = localStorage.getItem('users')
        const dataIndex = data ? JSON.parse(data) : [];
        const initialUsers = [...dataIndex, ...users];
        return initialUsers.length;
    })
    useEffect(() => {
        if (newUser) {
            console.log('Añadi el usuario nuevo a la lista de usuarios y LS')
            setIndexId((prevIndexId) => prevIndexId + 1);
            setUsers([...users, newUser]);
            localStorage.setItem('users', JSON.stringify([...users, newUser]));
        }
    }, [newUser]);
    const cacheData = localStorage.getItem('users')
    useEffect(() => {
        if (cacheData) {
            console.log('Entre al CacheData')
            setUsers(JSON.parse(cacheData));
        } else {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    const filteredUsers = data.map((user: DetailUser) => ({
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        address: {
                            street: user.address.street,
                            suite: user.address.suite,
                            city: user.address.city,
                            zipcode: user.address.zipcode,
                        },
                        phone: user.phone,
                        website: user.website,
                        company: {
                            name: user.company.name
                        }
                    }));
                    console.log('No encontra data en LS', filteredUsers)
                    localStorage.setItem('users', JSON.stringify(filteredUsers))
                    setUsers(filteredUsers)
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, []);
    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Detalle',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Link to={`/user/${id}`}> Ver Más</Link >
        }
    ];
    return (
        <section className="container__childrens">
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ marginBottom: 32 }}>Usuarios:</h1>
                    <Button type="primary" onClick={() => setModalView(true)}>
                        Agregar
                    </Button>
                </div>
                <Table columns={columns} dataSource={users.map((user) => ({
                    ...user,
                    key: user.id.toString(),
                }))} />
            </div>
            <MyApp modalView={modalView} setModalView={setModalView} indexId={indexId} newUser={newUser} setNewUser={setNewUser} />
        </section>
    )
}
