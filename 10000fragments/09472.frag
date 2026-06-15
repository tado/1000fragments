uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.70 + t * 1.85 + ph) + sin(p.y * 7.80 - t * 1.51 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.85 + vec2(t * 2.45, -t * 2.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.50, lr * 2.40 + time * -0.48); }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.61 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.32 + time * 0.12, vec3(0.55, 0.55, 0.56), vec3(0.39, 0.39, 0.35), vec3(0.95, 0.81, 0.92), vec3(0.63, 0.54, 0.51));
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
