import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import PokemonCard from './PokemonCard';
import usePokemon from '../hooks/usePokemon';
import { Loading } from './Loading';
import Pagination from './Pagination';
import usePokemonsByTYpe from '../hooks/usePokemonsByType';
import axios from 'axios';
import "./PokemonList.css"

const PokemonList = () => {
	const { isLoading, pokemons, setPokemons } = usePokemon();
	const { pokemonsByType } = usePokemonsByTYpe();
	const [page, setPage] = useState(1);
	const [searchPokemon, setSearchPokemon] = useState('');
	const userName = useSelector(state => state.userName);

	const perPage = 10;
	const lastIndex = page * perPage;
	const firstIndex = lastIndex - perPage;
	const pokemonsPaginated = () => {
		if (searchPokemon.length === 0 || searchPokemon === '') {
			return pokemons.slice(firstIndex, lastIndex);
		} else if (searchPokemon.length > 0) {
			const filteredPokemons = pokemons.filter(pokemon =>
				pokemon.name.includes(searchPokemon)
			);
			return filteredPokemons.slice(firstIndex, lastIndex);
		}
	};

	const handlePageClick = e => {
		const selectedPage = e.selected + 1;
		setPage(selectedPage);
	};

	const onSearchChange = e => {
		setPage(1);
		setSearchPokemon(e.target.value);
	};

	const filteredType = e => {
		setPage(1);
		axios.get(`https://pokeapi.co/api/v2/type/${e.target.value}`).then(res => {
			setPokemons(res.data.pokemon);
		});
	};

	return (
		<div className="pokemon-list">
			<Header />

			
			<div className="barras">
				<h2 className="bara">
					Welcome: <b className='U' >{userName}</b> 
					<h2> Are you a trainer?</h2>
				</h2>

			<div className='one'>
				<div className="Search">
				
					<input
						className="Stext"
						type="text"
						placeholder="search favorite pokemon"
						value={searchPokemon}
						onChange={onSearchChange}
					/>
					
					<div className="Stype">
						<select className="Sselect" onClick={filteredType}>
							<option disabled value="">
								Select type pokemon
							</option>
							{pokemonsByType.map((pokemonType, index) => (
								<option value={index + 1} key={pokemonType.name}>
									{pokemonType.name.replace(/^\w/, c => c.toUpperCase())}
								</option>
							))}
						</select>
					</div>
			</div>	
				</div>

				{/* Pokemons Cards */}
				{isLoading && <Loading />}
				<div className="Pokemon-cards">
					{pokemonsPaginated().map(pokemon => (
						<PokemonCard
							key={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
							pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
						/>
					))}
				</div>

				{/* Pagination */}
				<Pagination  handlePageClick={handlePageClick} />
			</div>
			<Footer />
		</div>
	);
};

export default PokemonList;
