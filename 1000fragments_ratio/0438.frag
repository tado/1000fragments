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
    v = 0.5 * sin(length(p) * 23.53 - t * 6.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.69), 0.0);
	vec2 hq = rot2(0.55) * p * 15.54;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.16 + (time * 0.69) * 0.14, vec3(0.45, 0.45, 0.42), vec3(0.18, 0.11, 0.08), vec3(0.45, 0.67, 0.86), vec3(0.38, 0.90, 0.65)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.930, 0.968, 1.033) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
