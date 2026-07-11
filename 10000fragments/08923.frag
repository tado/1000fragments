uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.66 * sin(mf + 3.0) + ph), cos(t * 0.66 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 2.74 + time * -0.43); }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.54; p = rot2(0.34) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
