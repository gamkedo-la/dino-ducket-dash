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
