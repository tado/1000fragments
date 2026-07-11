uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.22 * cos(sa * 6.0 + t * 0.69 + ph);
    v = sin((sr - petal) * 15.63);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.08 + t * 1.37 + ph) + sin(p.y * 13.60 - t * 1.08 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.74 + t * 1.54 + ph) + sin(p.y * 5.50 - t * 1.54 + ph)
        + sin((p.x + p.y) * 4.22 + t * 1.54 + ph) + sin(length(p) * 5.86 - t * 1.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.39) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.82, lr * 1.90 + time * 0.73); }
	q3 = rot2(0.62) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d3 = fieldC(q3, time, 1.51);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.01));
	vec3 col = palette(d * 0.51 + time * 0.17, vec3(0.58, 0.45, 0.53), vec3(0.47, 0.34, 0.33), vec3(1.20, 1.21, 1.27), vec3(0.63, 0.92, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
