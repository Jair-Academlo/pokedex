import React, { useState } from 'react';
import "./Login.css"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
	const [userName, setUserName] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		dispatch({ type: 'SET_USER_NAME', payload: userName });
		setUserName('');
		navigate('/pokedex');
	};

	return (
		<div className="d">
			<div>
			<img className="img-login" src="https://media.vandal.net/i/1200x630/10-2021/2021105724573_1.jpg" alt="Logo Pokedex" />
				<h1 className="text-center mt-5" style={{ color: 'red' }}>
					¡Hola entrenador!
				</h1>
			</div>
			<div>
				<form
					className="form-group form-login d-flex justify-content-center mb-4"
					onSubmit={handleSubmit}
				>
					<input
						className="form-control w-75"
						type="text"
						placeholder="Coloca tu nombre para ingresar"
						value={userName}
						onChange={e => setUserName(e.target.value)}
						required
					/>
					<button className="btn btn-danger">Ingresar</button>
				</form>
				<img className="trainers" src= "https://assets.pokemon.com/assets//cms2-es-es/img/video-games/_tiles/25th/memorable-moments/unova/unova-169.gif" alt="Logo Trainers" />
			</div>
			<footer className='foo'>
				<img className='pikachu' src="https://i.pinimg.com/originals/ab/be/28/abbe28a943ed44fcd98452687f7c46c9.gif" alt="" />
				<img className='pikachu' src="https://i.pinimg.com/originals/ab/be/28/abbe28a943ed44fcd98452687f7c46c9.gif" alt="" />
				<img className='pikachu' src="https://i.pinimg.com/originals/ab/be/28/abbe28a943ed44fcd98452687f7c46c9.gif" alt="" />

			</footer>
		</div>
	);
};

export default Login;
