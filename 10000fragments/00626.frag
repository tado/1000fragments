uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.72 + sin(p.y * 5.72 + t * 3.07) * 4.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.82, lr * 2.31 + time * -0.59); }
	p *= 2.88;
	p = rot2(length(p) * 3.51 + time * 0.69) * p;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.85 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
