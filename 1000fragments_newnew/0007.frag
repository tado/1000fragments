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
    vec2 cq = p * 3.65 + vec2(t * 0.88, -t * 2.15) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	float d = 0.5 + 0.5 * field(p, (time * 0.71), 0.0);
	vec2 hq = rot2(1.15) * p * 8.81;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.48 + (time * 0.71) * 0.13, vec3(0.41, 0.39, 0.29), vec3(0.29, 0.22, 0.27), vec3(0.49, 0.65, 0.86), vec3(0.90, 0.61, 0.27)) * v;
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 1.005, 0.949) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
