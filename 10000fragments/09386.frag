uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.27 * jf)) * 0.39;
        xs += sin(length(p - im) * 213.71 - t * 10.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.15, lr * 2.94 + time * -0.69); }
	p = rot2(1.41) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.11; p = rot2(1.98) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.37));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
