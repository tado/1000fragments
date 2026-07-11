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
    v = sin(p.x * 8.20 + sin(p.y * 4.01 + t * 0.93) * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.72), 0.0);
	vec2 hq = rot2(1.00) * p * 12.96;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.87 + (time * 0.72) * 0.22, vec3(0.29, 0.32, 0.29), vec3(0.26, 0.28, 0.24), vec3(0.72, 0.49, 0.42), vec3(0.62, 0.11, 0.62)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.930, 0.997, 1.051) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
