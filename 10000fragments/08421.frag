uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.15 * cos(sa * 4 + t * 1.95 + ph);
    v = sin((sr - petal) * 8.88);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.85 - t * 8.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	{ float fr = length(p); p *= 1.0 + -0.46 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 2.60 + time * -0.19); }
	p *= 1.95;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.52 + time * 0.20, vec3(0.46, 0.59, 0.43), vec3(0.32, 0.34, 0.39), vec3(1.01, 1.09, 0.77), vec3(0.60, 0.78, 0.50));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
