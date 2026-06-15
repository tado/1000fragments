uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.46 + sin(p.y * 3.45 + t * 4.00) * 1.96 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.20 * cos(sa * 9 + t * 1.93 + ph);
    v = sin((sr - petal) * 8.94);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 2.96 + time * 0.57); }
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.14, vec3(0.49, 0.52, 0.42), vec3(0.46, 0.44, 0.46), vec3(1.33, 0.77, 0.80), vec3(0.17, 0.14, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
