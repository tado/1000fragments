uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.16 * cos(sa * 8 + t * 1.13 + ph);
    v = sin((sr - petal) * 11.21);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.59 + vec2(t * 0.43, -t * 0.43) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.22, lr * 2.05 + time * 0.17); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.01, vec3(0.48, 0.48, 0.52), vec3(0.35, 0.31, 0.32), vec3(1.24, 0.88, 0.91), vec3(0.37, 0.16, 0.77));
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
