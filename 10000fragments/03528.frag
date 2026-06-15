uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.18 * cos(sa * 8 + t * 2.23 + ph);
    v = sin((sr - petal) * 17.40);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.91 + sin(p.y * 3.16 + t * 4.94) * 4.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	p = rot2(2.94) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.06, lr * 1.11 + time * -0.54); }
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	p = rot2(time * -0.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.18 + time * 0.07, vec3(0.45, 0.56, 0.47), vec3(0.49, 0.30, 0.38), vec3(1.32, 1.38, 1.20), vec3(0.64, 0.92, 0.15));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
