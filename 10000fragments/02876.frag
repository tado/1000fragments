uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.76 + vec2(t * 0.43, -t * 0.43) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 5.33 - time * 0.16); }
	p *= 2.74;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.15, lr * 2.87 + time * 0.21); }
	p = fract(p * 2.24) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.70));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
