uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.76 + sin(p.y * 2.75 + t * 3.58) * 2.01 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	p = abs(p) - 0.68;
	p *= 1.64;
	p = fract(p * 1.36) - 0.5;
	p = rot2(p.y * 3.11 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.29, vec3(0.55, 0.41, 0.54), vec3(0.44, 0.38, 0.37), vec3(1.16, 1.24, 0.71), vec3(0.99, 0.20, 0.58));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
