uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.31 * jf)) * 0.37;
        xs += sin(length(p - im) * 121.56 - t * 5.17 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p *= 1.28;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(1.55) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 2.10 + time * 0.35); }
	p = rot2(p.y * 1.19 + time * 0.20) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
