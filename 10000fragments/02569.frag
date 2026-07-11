uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.17 * cos(sa * 4 + t * 1.37 + ph);
    v = sin((sr - petal) * 6.06);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	{ p = vec2(atan(p.y, p.x) * 2.09, length(p) * 3.40 - time * 0.18); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.44, lr * 1.66 + time * 0.24); }
	p = rot2(length(p) * 2.01 + time * 0.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
