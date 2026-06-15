uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.62, t * 2.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 2.17 + time * -0.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.20, vec3(0.51, 0.41, 0.43), vec3(0.47, 0.44, 0.44), vec3(0.80, 1.17, 0.77), vec3(0.60, 0.85, 0.34));
	col = mod(col * 2.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
