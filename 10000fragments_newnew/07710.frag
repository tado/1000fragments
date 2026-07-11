uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.38 + vec2(t * 0.98, -t * 1.38);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = sin(p * 2.41 + time * 0.68) * 0.86;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.55; p = rot2(0.73) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.91; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.17, vec3(0.45, 0.42, 0.58), vec3(0.38, 0.35, 0.46), vec3(1.21, 0.99, 1.30), vec3(0.92, 0.46, 0.95));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
