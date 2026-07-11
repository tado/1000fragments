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
    v = 0.25 * (sin(p.x * 3.31 + t * 2.58 + ph) + sin(p.y * 6.82 - t * 2.58 + ph)
        + sin((p.x + p.y) * 6.63 + t * 2.58 + ph) + sin(length(p) * 7.58 - t * 2.58 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.38 + (time * 0.71) * 0.77) * 0.17;
	p *= 1.15;
	float d = 0.5 + 0.5 * field(p, (time * 0.71), 0.0);
	vec2 hq = rot2(1.25) * p * 8.89;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.58 + (time * 0.71) * 0.29, vec3(0.36, 0.44, 0.44), vec3(0.25, 0.29, 0.28), vec3(0.71, 0.75, 0.88), vec3(0.15, 0.32, 0.42)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.971, 0.912) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
