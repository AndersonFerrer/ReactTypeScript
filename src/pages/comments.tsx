import React, { useEffect, useState } from 'react';
import '../index.css';
import { Skeleton } from 'antd';

interface CommentsType {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const Comments: React.FC = () => {

    const [data, setData] = useState<CommentsType[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const commentsPerPage = 6
    const pages = []
    const [loader, setLoader] = useState(true)

    for (let i = 0; i < data.length; i += commentsPerPage) {
        const page = data.slice(i, i + commentsPerPage);
        pages.push(page);
    }

    const currentComments = pages[currentPage];
    const localData = localStorage.getItem('comments')

    useEffect(() => {
        if (localData) {
            setData(JSON.parse(localData))
            setLoader(false)
        } else {
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then((res) => res.json())
                .then((res) => {
                    localStorage.setItem('comments', JSON.stringify(res))
                    setData(res)
                    setTimeout(() => {
                        setLoader(false)
                    }, 1000);
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, []);

    return (
        <section className='container__childrens'>
            <div className='container__list'>
                <h1>Comentarios</h1>
                {loader ? currentComments?.map((comment) => (
                    <Skeleton key={comment.id} active={loader} />
                )) : currentComments?.map((comment) => (
                    <div className='list__comment' key={comment.id}>
                        <h2 className='list__commet__title'>{comment.name}</h2>
                        <p className='list__comment__subtitle'>{comment.email}</p>
                        <p className='list__comment__subtitle'>{comment.body}</p>
                    </div>
                ))}
                <div className='list__buttons'>
                    <button
                        className='list__button'
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        {'<'}
                    </button>
                    <button
                        className='list__button'
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pages.length - 1}
                    >
                        {'>'}
                    </button>
                </div>

            </div>

        </section >

    );
};

export default Comments;