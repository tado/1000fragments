uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.12 + vec2(t * 0.99, -t * 2.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.25) * p * 10.51;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.17 + time * 0.19, vec3(0.46, 0.54, 0.55), vec3(0.42, 0.44, 0.31), vec3(0.77, 1.04, 0.74), vec3(0.63, 0.46, 0.71)) * v;
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.40 + time * 7.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
