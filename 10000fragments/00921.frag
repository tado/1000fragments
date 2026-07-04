uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.32 * jf)) * 0.71;
        xs += sin(length(p - im) * 73.00 - t * 8.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	p = fract(p * 1.12) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 1.44 + time * -0.55); }
	p.y += sin(p.x * 6.30 + time * 3.03) * 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.66), field(p, time, 1.31));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
