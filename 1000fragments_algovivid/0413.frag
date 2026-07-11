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
    vec3 g = vec3(p * 6.16, t * 2.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.74) * 0.36), cos((time * 0.74) * 0.89)) * 0.14;
	p *= 0.87;
	float d = 0.5 + 0.5 * field(p, (time * 0.74), 0.0);
	vec2 hq = rot2(0.55) * p * 16.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 1.13 + (time * 0.74) * 0.10, vec3(0.33, 0.21, 0.28), vec3(0.21, 0.20, 0.15), vec3(0.43, 0.53, 0.65), vec3(0.90, 0.61, 0.14)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.970, 0.947) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
