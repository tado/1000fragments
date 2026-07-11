uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.71, t * 1.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 2.94 + time * -0.70); }
	p += vec2(0.16, -0.30) * sin(length(p) * 2.94 - time * 1.16) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.27, vec3(0.56, 0.43, 0.53), vec3(0.30, 0.49, 0.47), vec3(0.99, 1.26, 0.94), vec3(0.74, 0.59, 0.48));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
