uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.07, t * 1.14 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	{ p = vec2(atan(p.y, p.x) * 1.43, length(p) * 5.56 - time * 0.65); }
	p = rot2(0.59) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 2.46 + time * 0.40); }
	p += vec2(0.03, -0.64) * sin(length(p) * 3.33 - time * 1.12) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.27, vec3(0.53, 0.42, 0.48), vec3(0.42, 0.45, 0.33), vec3(1.37, 0.98, 0.84), vec3(0.53, 0.72, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
