uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.26 * cos(sa * 5.0 + t * 2.22 + ph);
    v = sin((sr - petal) * 14.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	p = rot2(time * -1.07) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.30, lr * 1.67 + time * 0.65); }
	{ p = vec2(atan(p.y, p.x) * 2.19, length(p) * 4.19 - time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.90, 0.17, 0.57) * (0.19 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
