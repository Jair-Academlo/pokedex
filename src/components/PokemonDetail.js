import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pokemonApi } from '../api/pokemonApi';
import { useSelector } from 'react-redux';
import usePokemon from '../hooks/usePokemon';
import Footer from './Footer';
import { Loading } from './Loading';
import "./PokemonDetails.css"
import Header from './Header';


const PokemonDetail = () => {
	const { id } = useParams();
	const [pokemonDetail, setPokemonDetail] = useState({});
	const { isLoading } = usePokemon;
	const colors = useSelector(state => state.colors);

	useEffect(() => {
		pokemonApi.get(`/pokemon/${id}`).then(res => {
			setPokemonDetail(res.data);
		});
	}, [id]);

	if (pokemonDetail.types) {
		let pokemonType = pokemonDetail.types?.[0].type.name;

		const colorType = colors.filter(color => color.name === pokemonType);

		const bckgColor = colorType[0].backgr;
		const textColor = colorType[0].color;
		document.body.style.background = bckgColor;
		document.body.style.color = textColor;
	}

	

	return (
		<Fragment>
			<Header/>
			
		
			<div className="pokemon-detail">
				
				<img
					className="pokemon"
					src={pokemonDetail.sprites?.other.home.front_default}
					alt={`Imagen de ${pokemonDetail.name}`}
				/>

				<div className="return">
					<div className="detail-grid__1">
						<Link className=" d-block text-right" to={'/pokedex'}>
							<i className="bi bi-arrow-left-circle"></i>
						</Link>
					</div>
					<div className="details">
						{isLoading && <Loading />}
						<h4 className="d-inline-block border rounded p-2 text-dark mt-3 mb-25">
							#{pokemonDetail.id}
						</h4>
						<h1 className="text-uppercase text-shadow mb-25">
							{pokemonDetail.name}
						</h1>
						<div className="d-flex justify-content-center gap-10">
							<div>
								<p className="detail-1">Heigth</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.height / 10} mts
								</p>
							</div>
						
							<div>
								<p className="detail-1">Weigth</p>
								<p className="detail-2 text-lowercase">
									{pokemonDetail.weight / 10} kg
								</p>
							</div>
						</div>

						<div className="division">
							<hr />
						</div>

						
					</div>
				</div>

				<div className="pupupu">
					<div className="">
						<h3 className="transp"> ____</h3>
					</div>
					<div >
						<div >
							<h2>Estadístics</h2>
							
						</div>
						<div className="progress mb-3">
							<div
								className="progress-bar progress-bar-striped bg-success"
								role="progressbar"
								aria-valuenow={Number(pokemonDetail.stats?.[0].base_stat)}
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ width: `${pokemonDetail.stats?.[0].base_stat}%` }}
							>
								HP: {` ${pokemonDetail.stats?.[0].base_stat}%`}
							</div>
						</div>
						<div className="progress mb-3">
							<div
								className="progress-bar progress-bar-striped bg-info"
								role="progressbar"
								aria-valuenow={Number(pokemonDetail.stats?.[1].base_stat)}
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ width: `${pokemonDetail.stats?.[1].base_stat}%` }}
							>
								ATTACK: {` ${pokemonDetail.stats?.[1].base_stat}%`}
							</div>
						</div>
						<div className="progress mb-3">
							<div
								className="progress-bar progress-bar-striped bg-warning"
								role="progressbar"
								aria-valuenow={Number(pokemonDetail.stats?.[2].base_stat)}
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ width: `${pokemonDetail.stats?.[2].base_stat}%` }}
							>
								GUARD: {` ${pokemonDetail.stats?.[2].base_stat}%`}
							</div>
						</div>
						<div className="progress mb-3">
							<div
								className="progress-bar progress-bar-striped bg-danger"
								role="progressbar"
								aria-valuenow={Number(pokemonDetail.stats?.[5].base_stat)}
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ width: `${pokemonDetail.stats?.[5].base_stat}%` }}
							>
								SPEDD: {` ${pokemonDetail.stats?.[5].base_stat}%`}
							</div>
						</div>
					</div>
				</div>

				
			</div>
			<Footer />
		</Fragment>
	);
};

export default PokemonDetail;
