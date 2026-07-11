uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.01;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.56; kp = rot2(0.91) * kp; kp *= 1.21; }
    v = sin(kp.y * 2.42 - t * 1.48 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.10 * cos(sa * 9.0 + t * 1.44 + ph);
    v = sin((sr - petal) * 7.63);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.16, lr * 2.76 + time * -0.29); }
	p = (floor(p * 12.7) + 0.5) / 12.7;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.09 + time * 0.14, vec3(0.45, 0.56, 0.49), vec3(0.45, 0.38, 0.41), vec3(0.89, 0.75, 0.74), vec3(0.00, 0.86, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
