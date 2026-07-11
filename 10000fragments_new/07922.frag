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
    float petal = 0.46 + 0.26 * cos(sa * 5.0 + t * 2.75 + ph);
    v = sin((sr - petal) * 10.95);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 5.39 * sin(t * 1.10) + t * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	p = (floor(p * 27.3) + 0.5) / 27.3;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.83 + time * -0.69); }
	p = rot2(time * -1.09) * p;
	p = fract(p * 2.48) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.76 + time * 0.29, vec3(0.50, 0.44, 0.57), vec3(0.45, 0.34, 0.48), vec3(1.21, 1.29, 1.29), vec3(0.71, 0.88, 0.16));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
