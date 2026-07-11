uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.41, t * 1.51 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.02, lr * 1.18 + time * -0.77); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.05, vec3(0.52, 0.56, 0.42), vec3(0.47, 0.35, 0.49), vec3(1.28, 1.00, 1.01), vec3(0.71, 0.89, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
