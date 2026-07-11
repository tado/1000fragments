uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.67 + sin(p.y * 1.86 + t * 5.88) * 1.06 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.10 * cos(sa * 6 + t * 0.73 + ph);
    v = sin((sr - petal) * 9.20);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 1.98 + time * 0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.64);
	float d = d1 * d2;
	vec3 col = palette(d * 0.78 + time * 0.26, vec3(0.55, 0.40, 0.44), vec3(0.31, 0.46, 0.33), vec3(0.82, 1.16, 1.34), vec3(0.63, 0.77, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
