uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.55 + vec2(t * 0.55, -t * 1.23);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.91) * p * 12.44;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.83, 0.72, 0.77), vec3(0.15, 0.06, 0.09), v);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 1.85 + time * 14.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
