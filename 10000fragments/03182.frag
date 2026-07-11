uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.57 + vec2(t * 1.08, -t * 1.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.06 + time * 0.44); }
	p *= 1.42;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 2.14 - time * 0.36); }
	p = rot2(length(p) * 2.05 + time * 0.30) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.27));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
