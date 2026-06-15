uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.12 * cos(sa * 4 + t * 0.91 + ph);
    v = sin((sr - petal) * 15.22);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.02, lr * 1.39 + time * 0.62); }
	p += vec2(0.93, 0.65) * sin(length(p) * 3.92 - time * 0.56) * 0.24;
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 2.42 - time * 0.65); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.73));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
