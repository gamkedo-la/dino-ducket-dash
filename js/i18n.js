const catalog = {
	'es': {
		'Loading...': 'Cargando...',
		'Player': 'Jugador',
		'Click or Press Enter to Start': 'Click o Enter para empezar',
		'DINO NEEDS DUCKETS': '¡DINO NECESITA MONEDAS',
        'TO BUY SPACESHIP!': 'PARA COMPRAR SU NAVE!',
        'Fill ducket bucket': '¡Llena el monedero',
        'to escape meteor!': 'para escapar del meteoro!',
		'Press Enter to Start': 'Pulsa Enter para Empezar',
		'Collect and Deposit Coins!': '¡Recolecta y Deposita Monedas!',
		'Deposit Coins Here!': '¡Deposita las Monedas Aquí!',
		'SCORE': 'PUNTAJE',
		'GAME OVER!': '¡FIN DEL JUEGO!',
		'PRESS R TO TRY AGAIN!': '¡PULSA R PARA REINTENTAR!',
		'PRESS ESC TO GO BACK TO MAIN MENU!': '¡PULSA ESC PARA VOLVER AL MENU!',
		'HIGH SCORES': 'MAXIMOS PUNTAJES',
		'DINO DUCKET DASH! Any Key to Play, WASD or Arrow Keys to move': '¡DINO DUCKET DASH! Cualquier tecla para jugar, WASD o flechas para moverse',
		'1 PLAY': '1 JUGADOR',
		'2 PLAY': '2 JUGADOR',
		'3 PLAY': '3 JUGADOR',
		'4 PLAY': '4 JUGADOR',
		'HELP': 'AYUDA',
		'SCOREBOARD': 'PUNTAJES',
		'BACK': 'VOLVER',
		'Click to show Credits': 'Click para ver creditos',
		'Score': 'Puntos',
		'High Score': 'Máximo',
	},
};

function gettext(str) {
	const lang = navigator.language.split('-')[0];
	if (catalog.hasOwnProperty(lang)) {
		if (catalog[lang].hasOwnProperty(str)) {
			return catalog[lang][str];
		}
	}
	return str;
}

const _ = gettext;

window.addEventListener('load', (event) => {
	document.querySelectorAll('p,.header,#creditsBtn').forEach(element => {
		element.innerText = _(element.innerText);
	});
});
