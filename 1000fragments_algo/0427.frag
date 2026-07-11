uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.20 * pow(abs(cos(ra * 7.0 + t * 1.37)), 2.49);
    v = sin((rr - pet) * 16.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	float d = 0.5 + 0.5 * field(p, (time * 0.64), 0.0);
	vec2 hq = rot2(0.96) * p * 18.34;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = palette(d * 1.11 + (time * 0.64) * 0.23, vec3(0.36, 0.37, 0.32), vec3(0.22, 0.21, 0.27), vec3(0.45, 0.45, 0.72), vec3(0.59, 1.00, 0.24)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.973, 1.042) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
