uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.38, t * 1.74 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(1.52) * p;
	p = fract(p * 1.73) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 5.79 - time * 0.39); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.49, lr * 2.35 + time * 0.49); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.25, vec3(0.54, 0.52, 0.47), vec3(0.45, 0.34, 0.40), vec3(0.73, 1.17, 0.78), vec3(0.55, 0.36, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
