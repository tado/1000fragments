uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.43 * jf)) * 0.78;
        xs += sin(length(p - im) * 101.12 - t * 8.20 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.28, lr * 2.96 + time * -0.44); }
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(0.76) * p; }
	p = abs(p) - 0.63;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
