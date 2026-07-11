uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.44 + vec2(t * 1.01, -t * 0.61);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.67) * 0.93), cos((time * 0.67) * 1.04)) * 0.13;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	float d = 0.5 + 0.5 * field(p, (time * 0.67), 0.0);
	vec2 hq = rot2(0.25) * p * 11.95;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.91, 0.82, 0.60), vec3(0.01, 0.11, 0.13), v);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.02 + (time * 0.67) * 15.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.980, 0.935) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
