uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.91 + jf * 4.0), cos(t * 0.58 * jf)) * 0.91;
        xs += sin(length(p - im) * 165.85 - t * 8.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.17, lr * 1.63 + time * -0.53); }
	p = fract(p * 1.58) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.22));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
