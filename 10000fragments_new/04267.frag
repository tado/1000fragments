uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.33 + t * 1.02 + ph) + sin(p.y * 11.17 - t * 1.02 + ph)
        + sin((p.x + p.y) * 4.50 + t * 1.02 + ph) + sin(length(p) * 8.65 - t * 1.02 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.60) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.38, lr * 1.80 + time * 0.96); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.24));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
