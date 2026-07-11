uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.28 + sr * 10.14 - t * 4.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p += vec2(0.19, -0.13) * sin(length(p) * 4.86 - time * 1.66) * 0.30;
	p *= 3.23;
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 1.66 + time * -0.38); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.13));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
