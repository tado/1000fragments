uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.95 + t * 1.05 + ph) + sin(p.y * 13.79 - t * 1.05 + ph)
        + sin((p.x + p.y) * 10.64 + t * 1.05 + ph) + sin(length(p) * 9.76 - t * 1.05 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.44; p = rot2(0.87) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.49, lr * 1.91 + time * -0.29); }
	p = abs(p);
	p = rot2(time * 0.69) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.25));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
