uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.95, t * 2.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	p = rot2(length(p) * 3.92 + time * 0.96) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.29, lr * 2.83 + time * -0.20); }
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 4.61 - time * 0.18); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.76 + time * 0.27);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
