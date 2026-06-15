uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.16 * cos(sa * 3 + t * 2.78 + ph);
    v = sin((sr - petal) * 18.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 1.61 + time * -0.38); }
	{ p = vec2(atan(p.y, p.x) * 2.99, length(p) * 5.82 - time * 0.67); }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	p = rot2(time * -0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
