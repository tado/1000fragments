uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.25 * cos(sa * 7 + t * 1.68 + ph);
    v = sin((sr - petal) * 6.93);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p += vec2(-0.41, -0.06) * sin(length(p) * 2.46 - time * 0.64) * 0.12;
	{ p = vec2(atan(p.y, p.x) * 1.95, length(p) * 4.56 - time * 0.20); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.05, lr * 2.81 + time * -0.32); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.27, vec3(0.54, 0.59, 0.53), vec3(0.42, 0.43, 0.45), vec3(0.89, 0.82, 0.96), vec3(0.16, 0.09, 0.94));
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
