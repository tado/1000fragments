uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.22 * cos(sa * 9.0 + t * 2.01 + ph);
    v = sin((sr - petal) * 14.67);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.88 + sin(p.y * 5.19 + t * 4.38) * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.39, lr * 2.70 + time * -0.82); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.66 + time * 0.18, vec3(0.59, 0.48, 0.50), vec3(0.35, 0.41, 0.45), vec3(1.30, 0.86, 0.82), vec3(0.85, 0.03, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
