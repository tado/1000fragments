uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.32 + vec2(t * 0.51, -t * 0.32);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.38) * p * 12.80;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.84, 0.98, 0.71), vec3(0.13, 0.05, 0.11), v);
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
