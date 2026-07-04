uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.50 + vec2(t * 1.39, -t * 0.60);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.05) * p * 20.14;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.09, 0.07, 0.11), vec3(0.74, 0.77, 0.66), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
