uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.31 + vec2(t * 2.19, -t * 0.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	p = abs(p) - 0.75;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 2.71 + time * -0.68); }
	p = rot2(p.y * -2.14 + time * 0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.13, vec3(0.51, 0.41, 0.42), vec3(0.38, 0.44, 0.39), vec3(0.92, 1.18, 1.14), vec3(0.33, 0.81, 0.92));
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
