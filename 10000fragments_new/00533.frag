uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.19 + t * 3.99 + ph) + sin(p.y * 3.54 - t * 3.99 + ph)
        + sin((p.x + p.y) * 4.15 + t * 3.99 + ph) + sin(length(p) * 11.94 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.29, lr * 1.90 + time * -0.95); }
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
