uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.39 + vec2(t * 1.64, -t * 1.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	p = fract(p * 2.64) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.24, lr * 1.07 + time * -0.69); }
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 2.57 - time * 0.44); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.92));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
