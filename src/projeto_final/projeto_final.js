"use strict";

// Número de salas principais
const	NUMBER_OF_MAIN_ROOMS = 1;

// Vértices do cubo com aberturas centrado na origem de lado 1
const	MAIN_ROOM_VERTICES = [
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(-0.227272, 0.5, 0.5, 1.0),
	vec4(0.227272, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(0.227272, -0.5, 0.5, 1.0),
	vec4(-0.227272, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, 0.5, 1.0),

	vec4(0.5, 0.5, 0.227272, 1.0),
	vec4(0.5, 0.5, -0.227272, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.227272, 1.0),
	vec4(0.5, -0.5, 0.227272, 1.0),

	vec4(-0.5, 0.5, 0.227272, 1.0),
	vec4(-0.5, 0.5, -0.227272, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.227272, 1.0),
	vec4(-0.5, -0.5, 0.227272, 1.0),

	vec4(-0.227272, 0.5, -0.5, 1.0),
	vec4(0.227272, 0.5, -0.5, 1.0),
	vec4(0.227272, -0.5, -0.5, 1.0),
	vec4(-0.227272, -0.5, -0.5, 1.0)
];

// Tamanho das salas
const	MAIN_ROOM_SIZE = 1100;
const	ROOM_SIZE = 500 / 1100 * MAIN_ROOM_SIZE;

// Posição e tamanho das salas e das portas
const	MAIN_ROOM_POS = vec3(0, ROOM_SIZE / 2, 0);
const	MAIN_ROOM_SCALE = vec3(MAIN_ROOM_SIZE, ROOM_SIZE, MAIN_ROOM_SIZE);
const	ROOM_1_POS = vec3(0, ROOM_SIZE / 2, -(MAIN_ROOM_SIZE + ROOM_SIZE) / 2);
const	ROOM_2_POS = vec3((MAIN_ROOM_SIZE + ROOM_SIZE) / 2, ROOM_SIZE / 2, 0);
const	ROOM_3_POS = vec3(0, ROOM_SIZE / 2, (MAIN_ROOM_SIZE + ROOM_SIZE) / 2);
const	ROOM_4_POS = vec3(-(MAIN_ROOM_SIZE + ROOM_SIZE) / 2, ROOM_SIZE / 2, 0);
const	ROOM_POS = [ROOM_1_POS, ROOM_2_POS, ROOM_3_POS, ROOM_4_POS];
const	DOOR_1_POS = vec3(0, ROOM_SIZE / 2, -MAIN_ROOM_SIZE / 2);
const	DOOR_2_POS = vec3(MAIN_ROOM_SIZE / 2, ROOM_SIZE / 2, 0);
const	DOOR_3_POS = vec3(0, ROOM_SIZE / 2, MAIN_ROOM_SIZE / 2);
const	DOOR_4_POS = vec3(-MAIN_ROOM_SIZE / 2, ROOM_SIZE / 2, 0);
const	DOOR_POS = [DOOR_1_POS, DOOR_2_POS, DOOR_3_POS, DOOR_4_POS];

// Número de salas
const	NUMBER_OF_ROOMS = 4;

// Número de portas
const	NUMBER_OF_DOORS = 4;

// Número de cubos
const	NUMBER_OF_CUBES = 12;

// Vértices do cubo centrado na origem de lado 1
const	CUBE_VERTICES = [
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0)
];

// Número de esferas
const	NUMBER_OF_SPHERES = 9;

// Número de esferas no Portal
const	NUMBER_OF_PORTAL_SPHERES = 9;

// Vértices da pirâmide de cima, obejto base para implementar a esfera
const	SP_POS_VERT = [
	vec4(1.0, 0.0, 0.0, 1),
	vec4(0.0, 1.0, 0.0, 1),
	vec4(0.0, 0.0, 1.0, 1),
];

// Vértices da pirâmide de baixo, objeto base para implementar a esfera
const	SP_NEG_VERT = [
	vec4(-1.0, 0.0, 0.0, 1),
	vec4(0.0, -1.0, 0.0, 1),
	vec4(0.0, 0.0, -1.0, 1),
];

// Vértices dos triângulos que são as faces das pirâmides
const	SP_TRIANGLES = [
	[SP_POS_VERT[0], SP_POS_VERT[1], SP_POS_VERT[2]],
	[SP_POS_VERT[0], SP_NEG_VERT[2], SP_POS_VERT[1]],

	[SP_POS_VERT[0], SP_POS_VERT[2], SP_NEG_VERT[1]],
	[SP_POS_VERT[0], SP_NEG_VERT[1], SP_NEG_VERT[2]],

	[SP_NEG_VERT[0], SP_POS_VERT[2], SP_POS_VERT[1]],
	[SP_NEG_VERT[0], SP_POS_VERT[1], SP_NEG_VERT[2]],

	[SP_NEG_VERT[0], SP_NEG_VERT[1], SP_POS_VERT[2]],
	[SP_NEG_VERT[0], SP_NEG_VERT[2], SP_NEG_VERT[1]],
];

// Índices dos objetos
const	FIELD = 0;
const	GOALKEEPER_1 = 1;
const	GOALKEEPER_2 = 2;
const	BALL = 3;

// Raio de algumas esferas
const	EARTH_RADIO = 60 / 500 * ROOM_SIZE;
const	MOON_RADIO = 10 / 500 * ROOM_SIZE;
const	JUPITER_RADIO = 150 / 500 * ROOM_SIZE;
const	SUN_RADIO = 250 / 500 * ROOM_SIZE;
const	UNIVERSE_RADIOS = [EARTH_RADIO, MOON_RADIO, JUPITER_RADIO, SUN_RADIO];
const	COLLISION_RADIO = 40 / 500 * ROOM_SIZE;

// Cores
const	WHITE = vec4(1, 1, 1, 1);
const	MAIN_ROOM_COLOR = WHITE;
const	ROOM_1_COLOR = vec4(1, 0, 0, 1);
const	ROOM_2_COLOR = vec4(0, 1, 0, 1);
const	ROOM_3_COLOR = vec4(0, 0, 1, 1);
const	ROOM_4_COLOR = vec4(1, 1, 0, 1);
const	ROOM_COLORS = [ROOM_1_COLOR, ROOM_2_COLOR, ROOM_3_COLOR, ROOM_4_COLOR];
const	ROOM_COLOR_NAMES = ["vermelha", "verde", "azul", "amarela"];

// Propriedades da fonte de luz
const	LIGHT = {
	pos: vec4(0.0, 40.0, 0.0, 1.0), // posição
	amb: vec4(0.2, 0.2, 0.2, 1.0), // ambiente
	dif: vec4(1.0, 1.0, 1.0, 1.0), // difusão
	spec: vec4(1.0, 1.0, 1.0, 1.0), // especular
};

// Propriedades do material
const	MAT = {
	amb: vec4(0.4, 0.4, 0.4, 1.0),
	dif: vec4(1.0, 1.0, 1.0, 1.0),
	alfa: 50.0, // brilho ou shininess
};

// Camera
const	FOVY = 60;
const	ASPECT = 1;
const	NEAR = 0.1 / 500 * ROOM_SIZE;
const	FAR = 5000 / 500 * ROOM_SIZE;
const	EYE = vec3(0, 0, 0);
const	AT = vec3(0, 0, -1);
const	DIR = vec3(0, 0, -1);
const	UP = vec3(0, 1, 0);
const	CAMERA_VTRANS = 150 / 500 * ROOM_SIZE;
const	CAMERA_THETA = Math.PI / 2;
const	CAMERA_THETA_DEGREES = CAMERA_THETA * 180 / Math.PI;

// Constantes globais
const	BACKGROUND = [0.0, 0.0, 1.0, 0.3];
const	AXIS_X_IND = 0;
const	AXIS_Y_IND = 1;
const	AXIS_Z_IND = 2;
const	AXIS_X = vec3(1, 0, 0);
const	AXIS_Y = vec3(0, 1, 0);
const	AXIS_Z = vec3(0, 0, 1);

// Textura é um tabuleiro de xadrez 8 x 8
const	TEX_ROLS = 8;
const	TEX_COLS = 8;
const	TEX_SIDE = 128; // lado da imagem textura
const	TEX_COLOR_SIZE = 4; // RGBA

// Textura: coordenadas (s, t) entre 0 e 1
const	vTextura = [
	vec2(0.0, 0.0),
	vec2(0.0, 1.0),
	vec2(1.0, 1.0),
	vec2(1.0, 0.0)
];
const	NO_TEXTURE = vec2(-1, -1);

// Cria array de textura. Pixels costumam ser do tipo Uint8
var		gTexture = new Uint8Array(TEX_COLOR_SIZE * TEX_SIDE * TEX_SIDE);
const	URL_EARTH = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Earthmap1000x500.jpg"
const	URL_MOON = "https://img.odcdn.com.br/wp-content/uploads/2022/03/mapa-da-lua.jpg"
const	URL_JUPITER = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Jupiter_Cylindrical_Map_-_Dec_2000_PIA07782.jpg"
const	URL_SUN = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Solarsystemscope_texture_8k_sun.jpg"
const	URL_GOLD = "https://upload.wikimedia.org/wikipedia/commons/d/d8/GOLD_METALLIC_TEXTURE_%287241678418%29.jpg"
const	URL_SILVER = "https://upload.wikimedia.org/wikipedia/commons/b/bf/SILVER_METALLIC_TEXTURE_%287241694514%29.jpg"
const	URLS = [URL_EARTH, URL_MOON, URL_JUPITER, URL_SUN, URL_GOLD, URL_SILVER];

// Variáveis globais
var		gSpaceship = {
	time: Date.now(),
	running: true,
	step: false,
	delta: 0,
	portalObject: "sphere",
	gravity: -500,
	lightSpeed: 10e10,
};
var		gInterface = {};
var		gl; // webgl2
var		gCanvas; // canvas

// Objetos a serem renderizados
var		gObjects = [];

// Câmera
var		gCamera = new Camera();

// Guarda coisas do shader
var		gShader = {};

// Guarda coisas da interface e do contexto do programa
var		gCtx =
{
	view: mat4(), // view matrix, inicialmente identidade
	perspective: mat4(), // projection matrix, inicialmente identidade
};

// Vetores de atributos dos objetos
var		gPositions = [];
var		gColors = [];
var		gNormals = [];
var		gTextures = [];

// Chama a main quando terminar de carregar a janela
window.onload = main;

// Função que cria um cubo
function	Cube()
{
	this.draw = true;
	this.numberOfPositions = 0;
	this.positions = [];
	this.normals = [];
	this.colors = [];
	this.textures = [];
	this.text = 0;
	this.pos = vec3(0, 0, 0);
	this.pos2 = vec3(0, 0, 0);
	this.vTrans = vec3(0, 0, 0);
	this.trans = this.pos;
	this.theta = vec3(0, 0, 0);
	this.vTheta = vec3(0, 0, 0);
	this.rot = this.theta;
	this.scale = vec3(1, 1, 1);
	this.v = vec3(0, 0, 0);
	this.model = mat4();
	// Função que inicializa as posições do cubo e sua matriz de transformação
	this.init = function(cube)
	{
		square(this.positions, this.normals, CUBE_VERTICES, 1, 0, 3, 2);
		square(this.positions, this.normals, CUBE_VERTICES, 2, 3, 7, 6);
		square(this.positions, this.normals, CUBE_VERTICES, 3, 0, 4, 7);
		square(this.positions, this.normals, CUBE_VERTICES, 6, 5, 1, 2);
		square(this.positions, this.normals, CUBE_VERTICES, 4, 5, 6, 7);
		square(this.positions, this.normals, CUBE_VERTICES, 5, 4, 0, 1);
		this.numberOfPositions = this.positions.length;
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		// if (cube >= TROPHY_CUBE_1 && cube <= TROPHY_CUBE_3)
		// 	this.model = mult(shearYZ(-1, 0), this.model);
		this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
		this.model = mult(translate(this.pos[0], this.pos[1], this.pos[2]), this.model);
	};
	// Função que atualiza a matriz de transformação do cubo
	this.updateModel = function(cube)
	{
		this.model = mat4();
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.model = mult(rotate(this.rot[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.rot[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.rot[AXIS_X_IND], AXIS_X), this.model);
		this.trans = add(this.trans, mult(gSpaceship.delta, this.vTrans));
		this.pos2 = add(this.pos, this.trans);
		// if (cube == PORTAL_CUBE_5)
		// {
		// 	if (isOutOfLimits(PORTAL_CUBE_5))
		// 		for (let i = PORTAL_CUBE_1; i < PORTAL_CUBE_9 + 1; i++)
		// 			gObjects[i].trans = add(gObjects[i].trans, gObjects[i].v);
		// }
		this.model = mult(translate(this.pos2[0], this.pos2[1], this.pos2[2]), this.model);
	};
};

// Função que faz o cisalhamento YZ
function	shearYZ(y, z)
{
	return (mat4(1.0, 0.0, 0.0, 0.0,
		y, 1, 0.0, 0.0,
		z, 0.0, 1, 0.0,
		0.0, 0.0, 0.0, 1.0));
}

// Função que verifica se o objeto do portal passou do limite
function	isOutOfLimits(object)
{
	return ((gObjects[object].vTrans[1] > 0 &&
		gObjects[object].pos2[1] > ROOM_SIZE + 3 * gObjects[object].scale[1] / 2) ||
		(gObjects[object].vTrans[1] < 0 &&
		gObjects[object].pos2[1] < -3 * gObjects[object].scale[1] / 2) ||
		(gObjects[object].vTrans[2] > 0 &&
		gObjects[object].pos2[2] > ROOM_SIZE / 2 + 3 * gObjects[object].scale[2] / 2) ||
		(gObjects[object].vTrans[2] < 0 &&
		gObjects[object].pos2[2] < -ROOM_SIZE / 2 - 3 * gObjects[object].scale[2] / 2));
}

// Função que cria a sala principal
function	MainRoom()
{
	this.draw = true;
	this.numberOfPositions = 0;
	this.positions = [];
	this.normals = [];
	this.colors = [];
	this.textures = [];
	this.text = 0;
	this.pos = vec3(0, 0, 0);
	this.theta = vec3(0, 0, 0);
	this.scale = vec3(1, 1, 1);
	this.model = mat4();
	// Função que inicializa as posições da sala principal e sua matriz de transformação
	this.init = function()
	{
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 0, 1, 6, 7);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 2, 3, 4, 5);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 3, 8, 13, 4);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 9, 10, 11, 12);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 0, 7, 19, 14);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 15, 18, 17, 16);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 16, 17, 23, 20);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 21, 22, 11, 10);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 0, 16, 10, 3);
		square(this.positions, this.normals, MAIN_ROOM_VERTICES, 17, 7, 4, 11);
		this.numberOfPositions = this.positions.length;
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
		this.model = mult(translate(this.pos[0], this.pos[1], this.pos[2]), this.model);
	};
};

// Função que cria uma sala
function	Room()
{
	this.draw = true;
	this.numberOfPositions = 0;
	this.positions = [];
	this.normals = [];
	this.colors = [];
	this.textures = [];
	this.text = 0;
	this.pos = vec3(0, 0, 0);
	this.theta = vec3(0, 0, 0);
	this.scale = vec3(1, 1, 1);
	this.model = mat4();
	// Função que inicializa as posições da sala e sua matriz de transformação
	this.init = function()
	{
		square(this.positions, this.normals, CUBE_VERTICES, 2, 6, 7, 3);
		square(this.positions, this.normals, CUBE_VERTICES, 3, 7, 4, 0);
		square(this.positions, this.normals, CUBE_VERTICES, 6, 2, 1, 5);
		square(this.positions, this.normals, CUBE_VERTICES, 4, 7, 6, 5);
		square(this.positions, this.normals, CUBE_VERTICES, 5, 1, 0, 4);
		this.numberOfPositions = this.positions.length;
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
		this.model = mult(translate(this.pos[0], this.pos[1], this.pos[2]), this.model);
	};
};

// Função que cria uma porta
function	Door()
{
	this.draw = true;
	this.numberOfPositions = 0;
	this.positions = [];
	this.normals = [];
	this.colors = [];
	this.textures = [];
	this.text = 0;
	this.pos = vec3(0, 0, 0);
	this.theta = vec3(0, 0, 0);
	this.scale = vec3(1, 1, 1);
	this.moving = false;
	this.trans = vec3(0, 0, 0);
	this.vTrans = 5;
	this.colorName = "";
	this.message = "abrindo.";
	this.model = mat4();
	// Função que inicializa as posições do cubo e sua matriz de transformação
	this.init = function()
	{
		square(this.positions, this.normals, CUBE_VERTICES, 1, 0, 3, 2);
		this.numberOfPositions = this.positions.length;
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
		this.model = mult(translate(this.pos[0], this.pos[1], this.pos[2]), this.model);
		this.transLimit = this.scale[1] / this.vTrans[1];
	};
	// Função que atualiza a matriz de transformação da porta
	this.updateModel = function()
	{
		if (this.moving)
		{
			this.trans[1] += this.vTrans;
			this.model = mat4();
			this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
			this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
			this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
			this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
			this.model = mult(translate(this.pos[0], this.pos[1] + this.trans[1], this.pos[2]), this.model);
			if (this.trans[1] == this.scale[1])
			{
				this.moving = false;
				this.vTrans *= -1;
				this.message = "fechando.";
			}
			else if (this.trans[1] == 0)
			{
				this.moving = false;
				this.vTrans *= -1;
				this.message = "abrindo.";
			}
		}
	};
};

// Função que, dado um quadrado, divide-o em dois triângulos,
// calcula a normal do quadrado e adiciona suas posições e normal
// em seus respectivos vetores
function	square(positions, normals, vertices, a, b, c, d)
{
	var	t1 = subtract(vertices[b], vertices[a]);
	var	t2 = subtract(vertices[c], vertices[b]);
	var	normal = cross(t1, t2);
	normal = vec3(normal);

	positions.push(vertices[a]);
	normals.push(normal);
	positions.push(vertices[b]);
	normals.push(normal);
	positions.push(vertices[c]);
	normals.push(normal);
	positions.push(vertices[a]);
	normals.push(normal);
	positions.push(vertices[c]);
	normals.push(normal);
	positions.push(vertices[d]);
	normals.push(normal);
};

// Função que cria uma esfera
function	Sphere(numberOfDivisions = 4)
{
	this.draw = true;
	this.numberOfPositions = 0;
	this.positions = [];
	this.normals = [];
	this.colors = [];
	this.textures = [];
	this.text = 0;
	this.pos = vec3(0, 0, 0);
	this.pos2 = vec3(0, 0, 0);
	this.vTrans = vec3(1, 1, 0);
	this.bounciness = 1;
	this.trans = this.pos;
	this.theta = vec3(0, 0, 0);
	this.vTheta = vec3(0, 0, 0);
	this.vTheta1 = vec3(0, 0, 0);
	this.rot = this.theta;
	this.rot1 = this.theta;
	this.scale = vec3(1, 1, 1);
	this.v = vec3(0, 0, 0);
	this.model = mat4();
	// Função que inicializa as posições da esfera e sua matriz de transformação
	this.init = function()
	{
		this.pos2 = this.pos;
		for (let i = 0; i < SP_TRIANGLES.length; i++)
		{
			let	a, b, c;
			[a, b, c] = SP_TRIANGLES[i];
			splitTriangles(a, b, c, numberOfDivisions, this.positions, this.normals);
		}
		this.numberOfPositions = this.positions.length;
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.model = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), this.model);
		this.model = mult(translate(this.pos[0], this.pos[1], this.pos[2]), this.model);
	};
	// Função que atualiza a matriz de transformação da esfera
	this.updateModel = function(sphere)
	{
		this.model = mat4();
		this.model = mult(scale(this.scale[0], this.scale[1], this.scale[2]), this.model);
		this.rot = add(this.rot, mult(gSpaceship.delta, this.vTheta));
		this.model = mult(rotate(this.rot[AXIS_Z_IND], AXIS_Z), this.model);
		this.model = mult(rotate(this.rot[AXIS_Y_IND], AXIS_Y), this.model);
		this.model = mult(rotate(this.rot[AXIS_X_IND], AXIS_X), this.model);
		if ((this.pos[0] <= -41 && this.pos[1] <= gObjects[GOALKEEPER_1].pos[1] + 8 && this.pos[1] >= gObjects[GOALKEEPER_1].pos[1] - 8) ||
				(this.pos[0] >= 41 && this.pos[1] <= gObjects[GOALKEEPER_2].pos[1] + 8 && this.pos[1] >= gObjects[GOALKEEPER_2].pos[1] - 8))
			this.vTrans[0] *= -1;
		else if (this.pos[0] <= -43 || this.pos[0] >= 43)
		 	this.pos = vec3(0, 0, -96);
		if (this.pos[1] <= -28 || this.pos[1] >= 28)
			this.vTrans[1] *= -1;
		this.trans = add(this.pos, mult(gSpaceship.delta, this.vTrans));
		this.pos = this.trans;
		this.model = mult(translate(this.trans[0], this.trans[1], this.trans[2]), this.model);
	};
	// Função que verifica colisões entre uma esfera e as paredes da sala
	this.checkCollision = function(sphere)
	{
		for (let i = 0; i <= 2; i++)
		{
			if (gObjects[sphere].pos2[i] >= -COLLISION_RADIO + gObjects[ROOM_2].pos[i] + ROOM_SIZE / 2)
			{
				this.vTrans[i] *= -1 * this.bounciness;
				this.pos2[i] = -COLLISION_RADIO + gObjects[ROOM_2].pos[i] + ROOM_SIZE / 2;
			}
			else if (gObjects[sphere].pos2[i] <= gObjects[ROOM_2].pos[i] - ROOM_SIZE / 2 + COLLISION_RADIO)
			{
				this.vTrans[i] *= -1 * this.bounciness;
				this.pos2[i] = gObjects[ROOM_2].pos[i] - ROOM_SIZE / 2 + COLLISION_RADIO;
			}
		}
	};
};

// Função recursiva que, dado uma face de uma das pirâmides base da esfera,
// divide-a em uma potência de quatro triângulos e, depois calcula a normal
// do triângulo e adiciona suas posições e normal em seus respectivos vetores
function	splitTriangles(a, b, c, numberOfDivisions, positions, normals)
{
	if (numberOfDivisions > 0)
	{
		let	ab = mix(a, b, 0.5);
		let	bc = mix(b, c, 0.5);
		let	ca = mix(c, a, 0.5);

		ab = normalize(ab, true);
		bc = normalize(bc, true);
		ca = normalize(ca, true);

		splitTriangles(a, ab, ca, numberOfDivisions - 1, positions, normals);
		splitTriangles(b, bc, ab, numberOfDivisions - 1, positions, normals);
		splitTriangles(c, ca, bc, numberOfDivisions - 1, positions, normals);
		splitTriangles(ab, bc, ca, numberOfDivisions - 1, positions, normals);
	}
	else
	{
		var	t1 = subtract(b, a);
		var	t2 = subtract(c, a);
		var	normal = cross(t1, t2);
		normal = vec3(normal);

		positions.push(a);
		normals.push(normal);
		positions.push(b);
		normals.push(normal);
		positions.push(c);
		normals.push(normal);
	}
};

// Função que cria a câmera
function	Camera()
{
	this.pos = EYE;
	this.at = AT;
	this.dir = DIR;
	this.dir4 = vec4(0, 0, 0, 0);
	this.up = UP;
	this.theta = vec3(0, 0, 0);
	this.vTrans = 0;
	this.trans = vec3(0, 0, 0);
	this.recalculateView = false;
	// Função que atualiza a matriz view da esfera
	// por meio de uma matriz de transformação
	this.updateView = function()
	{
		if (this.recalculateView == true)
		{
			let	transform = mat4();

			transform = mult(rotate(this.theta[AXIS_Z_IND], AXIS_Z), transform);
			transform = mult(rotate(this.theta[AXIS_Y_IND], AXIS_Y), transform);
			transform = mult(rotate(this.theta[AXIS_X_IND], AXIS_X), transform);
			this.theta = vec3(0, 0, 0);
			this.dir4 = vec4(this.dir[0], this.dir[1], this.dir[2], 0);
			this.trans = mult(gSpaceship.delta * this.vTrans, this.dir4);
			this.vTrans = 0;
			transform = mult(translate(this.trans[0], this.trans[1], this.trans[2]), transform);
			gCtx.view = mult(transform, gCtx.view);
			gl.uniformMatrix4fv(gShader.uView, false, flatten(gCtx.view));
			this.recalculateView = false;
		}
	};
};

// Função que começa o programa
function	main()
{
	// Ambiente
	gCanvas = document.getElementById("glcanvas");
	gl = gCanvas.getContext('webgl2');
	if (!gl)
		alert("Vixe! Não achei WebGL 2.0 aqui :-(");
	console.log("Canvas: ", gCanvas.width, gCanvas.height);

	// Interface
	buildInterface();
	// Textura
	createTexture();
	// Objetos
	createObjects();
	initObjects();
	insertAttributes();
	// Inicializações feitas apenas 1 vez
	gl.viewport(0, 0, gCanvas.width, gCanvas.height);
	gl.clearColor(BACKGROUND[0], BACKGROUND[1], BACKGROUND[2], BACKGROUND[3]);
	gl.enable(gl.DEPTH_TEST);
	// Shaders
	createShaders();
	// Finalmente...
	render();
};

// Função que cria e configura os elementos da interface e as funções de callback
function	buildInterface()
{
	gCtx.alfaEspecular = 1.0;

	gInterface.btRun = document.getElementById("bRun");
	gInterface.btRun.onclick = callbackRun;

	gInterface.btStep = document.getElementById("bStep");
	gInterface.btStep.onclick = callbackStep;

	window.onkeydown = callbackKeyDown;
};

// Função que lida com o evento do botão de Executar e Pausar
function	callbackRun(e)
{
	let	action = gInterface.btRun.value;

	if (action == "Executar")
	{
		console.log("O voo foi iniciado/despausado.");
		gInterface.btRun.value = "Pausar";
		gInterface.btStep.disabled = true;
		gSpaceship.running = true;
		gSpaceship.step = false;
	}
	else
	{
		console.log("O voo foi pausado.");
		gInterface.btRun.value = "Executar";
		gInterface.btStep.disabled = false;
		gInterface.btStep.value = "Passo";
		gSpaceship.running = false;
	}
};

// Função que lida com o evento do botão de Passo
function	callbackStep(e)
{
	gSpaceship.step = true;
	console.log("O botão Passo foi apertado: Um passinho para o lado, por favor!");
	console.log("Passou 1 segundo.");
	console.log("Estado do voo:");
	console.log(gObjects);
};

// Função que lida com o evento dos botões que movimentam a câmera
function	callbackKeyDown(e)
{
	const	keyName = e.key;

	if (keyName == "w" || keyName == "s" || keyName == "a" ||
		keyName == "d" || keyName == "z" || keyName == "x" ||
		keyName == "c" || keyName == "v" || keyName == "t" ||
		keyName == "g" || keyName == "5" || keyName == "2")
	{
		if (keyName == "w" || keyName == "s" || keyName == "a" ||
			keyName == "d" || keyName == "z" || keyName == "x" ||
			keyName == "c" || keyName == "v")
			gCamera.recalculateView = true;
		console.log("A tecla " + keyName + " foi apertada.");
		if (keyName == "w")
		{
			gCamera.theta = vec3(CAMERA_THETA, 0, 0);
			console.log("A nave virou para cima.");
		}
		else if (keyName == "s")
		{
			gCamera.theta = vec3(-CAMERA_THETA, 0, 0);
			console.log("A nave virou para baixo.");
		}
		else if (keyName == "a")
		{
			gCamera.theta = vec3(0, CAMERA_THETA, 0);
			console.log("A nave virou para a esquerda.");
		}
		else if (keyName == "d")
		{
			gCamera.theta = vec3(0, -CAMERA_THETA, 0);
			console.log("A nave virou para a direita.");
		}
		else if (keyName == "z")
		{
			gCamera.theta = vec3(0, 0, CAMERA_THETA);
			console.log("A nave girou no sentido anti-horário.");
		}
		else if (keyName == "x")
		{
			gCamera.theta = vec3(0, 0, -CAMERA_THETA);
			console.log("A nave girou no sentido horário.");
		}
		else if (keyName == "c")
		{
			gCamera.vTrans = CAMERA_VTRANS;
			console.log("A nave andou para trás.");
		}
		else if (keyName == "v")
		{
			gCamera.vTrans = -CAMERA_VTRANS;
			console.log("A nave andou para frente.");
		}
		else if (keyName == "t")
		{
			if (gObjects[GOALKEEPER_1].pos[1] < 22)
			{
				gObjects[GOALKEEPER_1].pos[1] += 1;
				console.log("O goleiro esquerdo subiu.")
			}
		}
		else if (keyName == "g")
		{
			if (gObjects[GOALKEEPER_1].pos[1] > -22)
			{
				gObjects[GOALKEEPER_1].pos[1] -= 1;
				console.log("O goleiro esquerdo desceu.")
			}
		}
		else if (keyName == "5")
		{
			if (gObjects[GOALKEEPER_2].pos[1] < 22)
			{
				gObjects[GOALKEEPER_2].pos[1] += 1;
				console.log("O goleiro direito subiu.")
			}
		}
		else if (keyName == "2")
		{
			if (gObjects[GOALKEEPER_2].pos[1] > -22)
			{
				gObjects[GOALKEEPER_2].pos[1] -= 1;
				console.log("O goleiro direito desceu.")
			}
		}
	}
	else
		console.log("Esta tecla não tem função para o voo.");
};

// Função que calcula as velocidades das esferas de colisão
function	calculateCollisionVelocity()
{
	let	x = randomizeInt(300, 751);
	let	y = randomizeInt(300, 751);
	let	z = randomizeInt(300, 751);
	let	cX = randomizeInt(0, 2);
	let	cY = randomizeInt(0, 2);
	let	cZ = randomizeInt(0, 2);

	if (!cX)
		cX = -1;
	if (!cY)
		cY = -1;
	if (!cZ)
		cZ = -1;
	return (vec3(cX * x, cY * y, cZ * z));
}

// Função que cria uma imagem quadriculada para ser usada como textura
function	createTexture()
{
	// Varre e carrega o array
	for (let i = 0, ind = 0; i < TEX_SIDE; i++)
	{
		let	squareX = Math.floor(i / (TEX_SIDE / TEX_ROLS));

		for (let j = 0; j < TEX_SIDE; j++)
		{
			let	squareY = Math.floor(j / (TEX_SIDE / TEX_COLS));
			let	c = (squareX % 2 != squareY % 2 ? 255 : 0);

			gTexture[ind++] = c;
			gTexture[ind++] = 0;
			gTexture[ind++] = 0;
			gTexture[ind++] = 255;
		};
	};
};

// Função que cria os objetos
function	createObjects()
{
	for (let i = 0; i < 3; i++)
		gObjects.push(new Cube());
	gObjects.push(new Sphere());
};

// Função que inicializa os objetos
function	initObjects()
{
	initField();
	initKeepers();
	initBall();
};

// Função que inicializa a Sala dos Troféus
function	initField()
{
	let	text = 5;
	
	gObjects[FIELD].pos = vec3(0, 0, -100);
	gObjects[FIELD].scale = vec3(90, 60, 4);
	gObjects[FIELD].init();
	// gObjects[FIELD].text = text;
	for (let j = 0; j < gObjects[FIELD].numberOfPositions; j++)
	{
		gObjects[FIELD].colors.push(vec4(0, 1, 0, 1));
		gObjects[FIELD].textures.push(NO_TEXTURE);
	}
	// for (let j = 0; j < 6; j++)
	// {
	// 	gObjects[FIELD].color.push(vTextura[0]);
	// 	gObjects[FIELD].textures.push(vTextura[1]);
	// 	gObjects[FIELD].textures.push(vTextura[2]);
	// 	gObjects[FIELD].textures.push(vTextura[0]);
	// 	gObjects[FIELD].textures.push(vTextura[2]);
	// 	gObjects[FIELD].textures.push(vTextura[3]);
	// }
};

// Função que inicializa a Sala do Portal
function	initKeepers()
{
	gObjects[GOALKEEPER_1].pos = vec3(-44, 0, -94);
	gObjects[GOALKEEPER_1].scale = vec3(2, 16, 8);
	gObjects[GOALKEEPER_1].init();
	for (let j = 0; j < gObjects[GOALKEEPER_1].numberOfPositions; j++)
	{
		gObjects[GOALKEEPER_1].colors.push(vec4(1, 0, 0, 1));
		gObjects[GOALKEEPER_1].textures.push(NO_TEXTURE);
	}

	gObjects[GOALKEEPER_2].pos = vec3(44, 0, -94);
	gObjects[GOALKEEPER_2].scale = vec3(2, 16, 8);
	gObjects[GOALKEEPER_2].init();
	for (let j = 0; j < gObjects[GOALKEEPER_2].numberOfPositions; j++)
	{
		gObjects[GOALKEEPER_2].colors.push(vec4(0, 0, 1, 1));
		gObjects[GOALKEEPER_2].textures.push(NO_TEXTURE);
	}
};

// Função que inicializa a Sala do Portal
function	initBall()
{
	gObjects[BALL].pos = vec3(0, 0, -96);
	gObjects[BALL].scale = vec3(2, 2, 2);
	gObjects[BALL].vTrans = vec3(randomizeInt(10, 20), randomizeInt(10, 20), 0);
	gObjects[BALL].init();
	for (let j = 0; j < gObjects[BALL].numberOfPositions; j++)
	{
		gObjects[BALL].colors.push(WHITE);
		gObjects[BALL].textures.push(NO_TEXTURE);
	}
};

// Função de insere os atributos dos objetos nas respectivas variáveis globais
function	insertAttributes()
{
	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < gObjects[i].numberOfPositions; j++)
		{
			gPositions.push(gObjects[i].positions[j]);
			gColors.push(gObjects[i].colors[j]);
			gNormals.push(gObjects[i].normals[j]);
			gTextures.push(gObjects[i].textures[j]);
		}
	}
};

// Função que cria e configura os shaders
function	createShaders()
{
	// Cria o programa
	gShader.program = makeProgram(gl, gVertexShaderSrc, gFragmentShaderSrc);
	gl.useProgram(gShader.program);

	// Cria e configura os buffers dos objetos
	createBuffers();

	// Resolve os uniforms
	gShader.uModel = gl.getUniformLocation(gShader.program, "uModel");
	gShader.uView = gl.getUniformLocation(gShader.program, "uView");
	gShader.uPerspective = gl.getUniformLocation(gShader.program, "uPerspective");
	gShader.uInverseTranspose = gl.getUniformLocation(gShader.program, "uInverseTranspose");

	// Calcula a matriz de transformação perpectiva (fovy, aspect, near, far)
	gCtx.perspective = perspective(FOVY, ASPECT, NEAR, FAR);
	gl.uniformMatrix4fv(gShader.uPerspective, false, flatten(gCtx.perspective));

	// Calcula a matriz view (pos, at, up)
	gCtx.view = lookAt(gCamera.pos, gCamera.at, gCamera.up);
	gl.uniformMatrix4fv(gShader.uView, false, flatten(gCtx.view));

	// Parâmetros para iluminação
	gShader.uLightPos = gl.getUniformLocation(gShader.program, "uLightPos");
	gl.uniform4fv(gShader.uLightPos, LIGHT.pos);

	// Fragment shader
	gShader.uAmbColor = gl.getUniformLocation(gShader.program, "uAmbColor");
	gShader.uDifColor = gl.getUniformLocation(gShader.program, "uDifColor");
	gShader.uSpecColor = gl.getUniformLocation(gShader.program, "uSpecColor");
	gShader.uAlphaSpec = gl.getUniformLocation(gShader.program, "uAlphaSpec");

	gl.uniform1f(gShader.uAlphaSpec, gCtx.alfaEspecular);
	gl.uniform4fv(gShader.uAmbColor, mult(LIGHT.amb, MAT.amb));
	gl.uniform4fv(gShader.uDifColor, mult(LIGHT.dif, MAT.dif));
	gl.uniform4fv(gShader.uSpecColor, LIGHT.spec);
	gl.uniform1f(gShader.uAlphaSpec, MAT.alfa);

	gShader.uTextureMap = gl.getUniformLocation(gShader.program, "uTextureMap");

	setUpTexture(gTexture, URLS.length);
	for (let i = 0; i < URLS.length; i++)
		setUpURLTexture(URLS[i], i);
};

function	createBuffers(obj)
{
	// Buffer dos vértices
	let	bufPositions = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufPositions);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(gPositions), gl.STATIC_DRAW);

	// Vincula o buffer de vértices e configura o atributo
	var	aPosition = gl.getAttribLocation(gShader.program, "aPosition");
	gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aPosition);

	// Buffer das cores
	let	bufColors = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufColors);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(gColors), gl.STATIC_DRAW);

	// Vincula o buffer de cores e configura o atributo
	var	aColor = gl.getAttribLocation(gShader.program, "aColor");
	gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aColor);

	// Buffer das normais
	let	bufNormals = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufNormals);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(gNormals), gl.STATIC_DRAW);

	// Vincula o buffer de normais e configura o atributo
	var	aNormal = gl.getAttribLocation(gShader.program, "aNormal");
	gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aNormal);

	// Buffer de textura
	let	bufTextures = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufTextures);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(gTextures), gl.STATIC_DRAW);

	// Vincula o buffer de textura e configura o atributo
	var aTextCoord = gl.getAttribLocation(gShader.program, "aTextCoord");
	gl.vertexAttribPointer(aTextCoord, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aTextCoord);
};

function	setUpURLTexture(url, textureUnit)
{
	var	texture = gl.createTexture();
	gl.activeTexture(gl[`TEXTURE${textureUnit}`]);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));

	var	img = new Image();
	img.src = url;
	img.crossOrigin = "anonymous";
	img.addEventListener('load', function()
	{
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, img.width, img.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.generateMipmap(gl.TEXTURE_2D);
	});
	return (texture);
};

function	setUpTexture(img, textureUnit)
{
	let	texture = gl.createTexture();
	gl.activeTexture(gl[`TEXTURE${textureUnit}`]);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TEX_SIDE, TEX_SIDE, 0, gl.RGBA, gl.UNSIGNED_BYTE, img);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
};

// Função que renderiza as imagens
function	render()
{
	let	time = Date.now();

	gSpaceship.delta = (time - gSpaceship.time) / 1000;
	if (gSpaceship.step)
		gSpaceship.delta = 0.3;
	if (!gSpaceship.running && !gSpaceship.step)
		gSpaceship.delta = 0;
	gSpaceship.time = time;
	gSpaceship.step = false;
	updateObjects();
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Configura e desenha os objetos
	let	begin = 0;

	for (let i = 0; i < 4; i++)
	{
		if (gObjects[i].draw)
		{
			calculateMatrices(gObjects[i]);
			gl.drawArrays(gl.TRIANGLES, begin, gObjects[i].numberOfPositions);
		}
		begin += gObjects[i].numberOfPositions;
	}
	window.requestAnimationFrame(render);
};

function	updateObjects()
{
	gCamera.updateView();
	for(let i = 0; i < 4; i++)
		gObjects[i].updateModel();
};

// Função que calcula a matriz transposta e multiplica pelas normais
function	calculateMatrices(obj)
{
	let modelView = mult(gCtx.view, obj.model);
	let	modelViewInv = inverse(modelView);
	let	modelViewInvTrans = transpose(modelViewInv);

	gl.uniformMatrix4fv(gShader.uModel, false, flatten(obj.model));
	gl.uniformMatrix4fv(gShader.uInverseTranspose, false, flatten(modelViewInvTrans));
	gl.uniform1i(gShader.uTextureMap, obj.text);
};

// Código fonte dos shaders em GLSL
// A primeira linha deve conter "#version 300 es" para WebGL 2.0
var gVertexShaderSrc = `#version 300 es

in vec4			aPosition;
in vec4			aColor;
in vec3			aNormal;
in vec2			aTextCoord;

uniform mat4	uModel;
uniform mat4	uView;
uniform mat4	uPerspective;
uniform mat4	uInverseTranspose;
uniform vec4	uLightPos;

out vec3		vNormal;
out vec3		vLight;
out vec3		vView;
out vec4		vColor;
out vec2		vTextCoord;

void	main()
{
	mat4	modelView = uView * uModel;
	gl_Position = uPerspective * modelView * aPosition;

	vNormal = mat3(uInverseTranspose) * aNormal;
	vec4	pos = modelView * aPosition;

	vLight = (uView * uLightPos - pos).xyz;
	vView = -(pos.xyz);
	vColor = aColor;
	vTextCoord = aTextCoord;
}`;

var	gFragmentShaderSrc = `#version 300 es

precision highp float;

in vec3				vNormal;
in vec3				vLight;
in vec3				vView;
in vec4				vColor;
in vec2				vTextCoord;

uniform vec4		uAmbColor;
uniform vec4		uDifColor;
uniform vec4		uSpecColor;
uniform float		uAlphaSpec;
uniform sampler2D	uTextureMap;

out vec4			finalColor;

void main()
{
	vec3	normalV = normalize(vNormal);
	vec3	lightV = normalize(vLight);
	vec3	viewV = normalize(vView);
	vec3	halfV = normalize(lightV + viewV);
	vec4	vColorAux = vColor;

	if (vTextCoord.x != -1.0)
		vColorAux *= texture(uTextureMap, vTextCoord);
	float	kd = max(0.0, dot(normalV, lightV));
	vec4	difuse = kd * uDifColor * vColorAux;

	float	ks = pow(max(0.0, dot(normalV, halfV)), uAlphaSpec);
	vec4	specular = vec4(0, 0, 0, 1);

	if (kd > 0.0)
		specular = ks * uSpecColor;
	finalColor = difuse + specular + uAmbColor * vColorAux;
	finalColor.a = 1.0;
}`;