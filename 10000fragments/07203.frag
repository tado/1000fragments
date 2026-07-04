uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.69 * sin(t * 0.90) + t * 3.49 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.06, t * 2.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.79; }
	p *= 1.94;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 1.89 + time * -0.51); }
	p = sin(p * 1.92 + time * 1.70) * 0.95;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.82);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.56 + time * 0.07, vec3(0.43, 0.53, 0.52), vec3(0.44, 0.36, 0.35), vec3(1.21, 1.32, 0.82), vec3(0.56, 0.85, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
