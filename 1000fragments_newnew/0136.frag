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
    vec3 g = vec3(p * 6.52, t * 2.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.56), 0.0);
	vec2 hq = rot2(0.58) * p * 21.41;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 1.15 + (time * 0.56) * 0.04, vec3(0.54, 0.47, 0.51), vec3(0.26, 0.24, 0.23), vec3(0.53, 0.84, 0.59), vec3(0.47, 0.13, 0.65)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.964, 1.021) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
