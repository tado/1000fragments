uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.02 + vec2(t * 2.26, -t * 0.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.39, lr * 1.89 + time * 0.89); }
	{ float fr = length(p); p *= 1.0 + 0.41 * fr * fr; }
	p = fract(p * 1.03) - 0.5;
	p = abs(p) - 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.20, vec3(0.53, 0.45, 0.56), vec3(0.36, 0.32, 0.46), vec3(0.76, 0.85, 0.80), vec3(0.22, 0.41, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
