uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.25 + vec2(t * 1.01, -t * 0.21);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.23) * p * 8.19;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.45 + time * 0.24, vec3(0.45, 0.49, 0.59), vec3(0.41, 0.43, 0.47), vec3(0.88, 0.85, 0.82), vec3(0.84, 0.20, 0.97)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
