uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.48 + t * 2.90 + ph) + sin(p.y * 11.54 - t * 2.90 + ph)
        + sin((p.x + p.y) * 2.75 + t * 2.90 + ph) + sin(length(p) * 12.24 - t * 2.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.53; p = rot2(0.64) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.32, lr * 2.51 + time * -0.22); }
	{ p = vec2(atan(p.y, p.x) * 1.25, length(p) * 2.70 - time * 0.77); }
	p *= 2.68;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.16));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
