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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.28;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.27); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.56, rv + 0.09 * sin(t * 2.67 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = rot2(length(p) * 2.02 + (time * 0.67) * 1.11) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.47; p = rot2(1.90) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 3.33 - (time * 0.67) * 0.61); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.14;
	float d = field(p, (time * 0.67), 0.0);
	vec3 col = vec3(0.46, 0.51, 0.37) * (0.07 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.023, 0.921) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
