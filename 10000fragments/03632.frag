uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.31 - t * 4.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.07, t * 0.51 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.47;
	p *= 1.67;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.30 + time * -0.76); }
	p = fract(p * 1.29) - 0.5;
	p += vec2(0.81, 0.06) * sin(length(p) * 5.67 - time * 1.72) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.28 + time * 0.28, vec3(0.50, 0.41, 0.47), vec3(0.34, 0.35, 0.46), vec3(0.94, 1.05, 1.32), vec3(0.06, 0.90, 0.15));
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
