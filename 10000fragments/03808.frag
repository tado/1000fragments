uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.51;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.39); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.43, 0.53, rv + 0.03 * sin(t * 2.24 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	p = sin(p * 1.87 + time * 2.41) * 1.41;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.75; }
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.17, 0.10), vec3(0.96, 0.63, 0.68), d);
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 0.88 + time * 10.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
