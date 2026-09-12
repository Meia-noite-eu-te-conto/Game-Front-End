function	drawOnCanvas(data)
{
	setup(data);
	render();
};

// O snapshot do Game-Core indexa `players` pelo valor de `color` do jogador
// (ex.: {"1": {...}, "2": {...}}), não por slot 0-indexado. Todo o renderer
// (InitAndUpdateObjects.js) assume chaves "0".."3" por posição — sem essa
// normalização, gPong.players["0"] é undefined e o primeiro acesso
// (.x, .y, ["color"], ...) quebra com "Cannot read properties of undefined".
// Reindexa por ordem crescente da chave original, uma vez, no único ponto
// onde o snapshot chega, em vez de mexer em cada função que consome
// gPong.players.
function normalizePlayerSlots(players)
{
	const orderedKeys = Object.keys(players).sort((a, b) => Number(a) - Number(b));
	const slots = {};
	orderedKeys.forEach((key, index) => {
		slots[index] = players[key];
	});
	return slots;
}

function	setup(data)
{
	const	parsedData = JSON.parse(data);
	const	{ players, ball, numberOfPlayers, fieldAttributes, gameStatus, lastPlayerHit } = parsedData;

	gPong.gameStatus = gameStatus;
	gPong.players = normalizePlayerSlots(players);
	gPong.ball = ball;
	gPong.numberOfPlayers = numberOfPlayers;
	gPong.numberOfObjects = gPong.numberOfPlayers + 2;
	gPong.fieldAttributes = fieldAttributes;
	gPong.fieldHeight = fieldAttributes["height"];
	gPong.fieldWidth = fieldAttributes["height"];
	gPong.lastPlayerHit = lastPlayerHit;
	if (gPong.lastPlayerHit || gPong.gameStatus == "WAITING")
		gPong.changeBallColor = TRUE;
	if (gPong.gameStatus == "PLAYING")
		gPong.doOnceChangeColor = TRUE;
	if (gPong.numberOfPlayers == 2)
		gPong.fieldWidth = fieldAttributes["width"];
	setObjectsColors();
	if (doOnce)
	{
		createTexture(255, 255, 255);
		createObjects();
		initObjects();
		insertAttributes();
		gl.viewport(0, 0, gCanvas.width, gCanvas.height);
		gl.clearColor(BACKGROUND[0], BACKGROUND[1], BACKGROUND[2], BACKGROUND[3]);
		gl.enable(gl.DEPTH_TEST);
		createShaders();
		doOnce = false;
	}
};

function	render()
{
	let	time = Date.now();

	gPong.delta = (time - gPong.time) / 1000;
	if (gPong.step)
		gPong.delta = 0.3;
	if (!gPong.running && !gPong.step)
		gPong.delta = 0;
	gPong.time = time;
	gPong.step = false;
	updateObjectsPosition();
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	let	begin = 0;

	for (let i = 0; i < gPong.numberOfObjects; i++)
	{
		calculateMatrices(gObjects[i]);
		gl.drawArrays(gl.TRIANGLES, begin, gObjects[i].numberOfPositions);
		begin += gObjects[i].numberOfPositions;
	}
};