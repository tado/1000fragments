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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.29;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.32); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.50, rv + 0.08 * sin(t * 1.16 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.68; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.28));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
