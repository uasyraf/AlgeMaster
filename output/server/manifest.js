export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "internal",
	appPath: "AlgeMaster/internal",
	assets: new Set(["Book.svg","Dinosaur.svg","Learning Bear.png","Learning Elephant.png","Pencil.png","Score.png","favicon.png","fonts/gothamblack-webfont.woff2","fonts/gothambold-webfont.woff2","fonts/gothambook-webfont.woff2","fonts/gothamlight-webfont.woff2","fonts/gothammedium-webfont.woff2","fonts/gothamthin-webfont.woff2","fonts/gothamultra-webfont.woff2","fonts/gothamxlight-webfont.woff2","lock.png","pohon-ilmu.png","trophy.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".woff2":"font/woff2"},
	_: {
		client: {start:"internal/immutable/entry/start.BmSUmrfC.js",app:"internal/immutable/entry/app.CLJWktI_.js",imports:["internal/immutable/entry/start.BmSUmrfC.js","internal/immutable/chunks/Cmht4O2h.js","internal/immutable/chunks/DvY1rSce.js","internal/immutable/chunks/C_4tnv-Q.js","internal/immutable/chunks/D-puOVQ6.js","internal/immutable/entry/app.CLJWktI_.js","internal/immutable/chunks/DvY1rSce.js","internal/immutable/chunks/BRbil3r8.js","internal/immutable/chunks/dY9nf8ta.js","internal/immutable/chunks/I2yrpOs2.js","internal/immutable/chunks/-Grza3r3.js","internal/immutable/chunks/CYu85bld.js","internal/immutable/chunks/D-puOVQ6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/standard-pembelajaran/[slug]/games",
				pattern: /^\/standard-pembelajaran\/([^/]+?)\/games\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/standard-pembelajaran/[slug]/notes",
				pattern: /^\/standard-pembelajaran\/([^/]+?)\/notes\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/teacher",
				pattern: /^\/teacher\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
