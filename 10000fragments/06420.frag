uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.44 + vec2(t * 2.76, -t * 2.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.06 + t * 4.67 + ph) + sin(p.y * 13.37 - t * 3.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.58;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.97, lr * 1.55 + time * 0.45); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = d1 * d2;
	vec3 col = palette(d * 1.03 + time * 0.13, vec3(0.44, 0.48, 0.47), vec3(0.49, 0.33, 0.39), vec3(1.26, 1.22, 0.95), vec3(0.58, 0.55, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
