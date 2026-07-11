uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.64 - t * 6.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p *= 1.42;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 2.48 + time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.04, vec3(0.58, 0.44, 0.44), vec3(0.31, 0.34, 0.31), vec3(1.31, 0.94, 1.13), vec3(0.93, 0.76, 0.05));
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
