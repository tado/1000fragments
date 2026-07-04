uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.73;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.85); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.45, 0.55, rv + 0.09 * sin(t * 1.76 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.86; }
	p = rot2(p.y * -2.94 + time * 0.31) * p;
	{ p = vec2(atan(p.y, p.x) * 2.68, length(p) * 4.79 - time * 0.52); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
