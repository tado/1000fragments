uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.59 + sin(p.y * 2.78 + t * 3.61) * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.50, lr * 1.66 + time * 0.27); }
	p = abs(p);
	p = rot2(length(p) * -3.49 + time * 1.37) * p;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.74 + time * 0.24);
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
