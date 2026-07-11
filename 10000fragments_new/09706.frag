uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.91 + vec2(t * 2.84, -t * 1.41) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.80 + t * 5.64 + ph) + sin(p.y * 15.84 - t * 0.82 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.71, lr * 2.24 + time * -0.48); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.12, vec3(0.52, 0.56, 0.49), vec3(0.39, 0.35, 0.47), vec3(1.38, 1.18, 0.98), vec3(0.62, 0.66, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
