uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.10 + jf * 4.0), cos(t * 0.23 * jf)) * 0.72;
        xs += sin(length(p - im) * 71.67 - t * 12.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.01 + time * 0.25); }
	{ p = vec2(atan(p.y, p.x) * 2.42, length(p) * 3.33 - time * 0.40); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.32));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
