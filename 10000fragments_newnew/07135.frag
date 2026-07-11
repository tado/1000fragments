uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.17 * cos(sa * 7.0 + t * 2.83 + ph);
    v = sin((sr - petal) * 15.66);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 4.91 * sin(t * 0.61) + t * 3.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.24 * sin(time * 3.89);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.95; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.26, lr * 1.92 + time * 0.25); }
	p += vec2(0.11, -0.68) * sin(length(p) * 2.24 - time * 1.49) * 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.25);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.31 + time * 0.08, vec3(0.49, 0.47, 0.50), vec3(0.48, 0.35, 0.34), vec3(1.02, 1.02, 1.02), vec3(0.27, 0.30, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
