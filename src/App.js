import style from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const formatDate = (dt) => {
		const date = new Date(dt);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
	};

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setValue(promptValue);
			setError('Введенное значение должно содержать минимум 3 символа');
		} else if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		}
	};

	const isValueValid = value.length >= 3;

	const onAddButtonClick = () => {
		if (isValueValid) {
			const id = Date.now();
			const createdAt = formatDate(id);
			const updatedList = [...list, { id, value, createdAt }];
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={style.app}>
			<h1 className={style['page-heading']}>Ввод значения</h1>
			<p className={style['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={style['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={style.error}>{error}</div>}
			<div className={style['buttons-container']}>
				<button className={style.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={style.button}
					disabled={isValueValid !== true}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={style['list-container']}>
				<h2 className={style['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={style['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={style.list}>
						{list.map((item) => (
							<li key={item.id} className={style['list-item']}>
								<div>{item.value}</div>
								<div className={style['created-at']}>
									{item.createdAt}
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
