uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.09, t * 0.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.86) * p * 9.57;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.79 + time * 0.14, vec3(0.41, 0.45, 0.48), vec3(0.42, 0.35, 0.38), vec3(0.83, 0.76, 1.34), vec3(0.50, 0.23, 0.46)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
