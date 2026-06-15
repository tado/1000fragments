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
    float petal = 0.57 + 0.24 * cos(sa * 7 + t * 2.75 + ph);
    v = sin((sr - petal) * 8.47);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.09 + t * 0.82 + ph) + sin(p.y * 15.38 - t * 3.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.13 + time * 0.79); }
	p = rot2(time * 0.25) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = d1 + d2;
	vec3 col = palette(d * 1.55 + time * 0.23, vec3(0.56, 0.44, 0.54), vec3(0.43, 0.38, 0.41), vec3(0.93, 1.34, 0.85), vec3(0.58, 0.50, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
