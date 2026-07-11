uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.17 * cos(sa * 8 + t * 1.64 + ph);
    v = sin((sr - petal) * 10.46);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.14 - t * 8.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 1.30 + time * 0.16); }
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.72 + time * 0.11, vec3(0.50, 0.43, 0.57), vec3(0.31, 0.32, 0.41), vec3(1.37, 1.05, 1.22), vec3(0.85, 0.48, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
