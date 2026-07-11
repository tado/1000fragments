uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.54, t * 1.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.42) * p * 17.06;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.52 + time * 0.28, vec3(0.53, 0.59, 0.46), vec3(0.43, 0.46, 0.36), vec3(1.31, 1.12, 0.75), vec3(0.57, 0.38, 0.66)) * v;
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 1.30 + time * 17.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
