uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.61;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.33 + 0.15 * sin(t * 4.07 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	p.x = abs(p.x);
	float d = 0.5 + 0.5 * field(p, (time * 0.56), 0.0);
	vec2 hq = rot2(0.48) * p * 16.18;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 1.45 + (time * 0.56) * 0.20, vec3(0.33, 0.24, 0.29), vec3(0.13, 0.15, 0.15), vec3(0.62, 0.76, 0.67), vec3(0.86, 0.08, 0.41)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 0.956, 0.992) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
