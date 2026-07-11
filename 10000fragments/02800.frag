uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.73 + vec2(t * 1.55, -t * 1.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p *= 1.35;
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 3.52 - time * 0.79); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 2.85 + time * 0.37); }
	p = abs(p) - 0.66;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.70));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
