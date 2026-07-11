uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 13.02 - t * 6.84 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 25.89 - t * 1.30 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.59) * 0.89), cos((time * 0.59) * 0.79)) * 0.15;
	p.x = abs(p.x) - 0.43;
	float d = 0.5 + 0.5 * field(p, (time * 0.59), 0.0);
	vec2 hq = rot2(0.39) * p * 22.34;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.01, 0.13, 0.06), vec3(0.87, 0.73, 0.73), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.990, 0.991) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
