uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.08 + t * 3.94 + ph) + sin(p.y * 10.06 - t * 3.94 + ph)
        + sin((p.x + p.y) * 8.66 + t * 3.94 + ph) + sin(length(p) * 12.49 - t * 3.94 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 1.99 + time * 0.46); }
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 4.81 - time * 0.53); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = rot2(p.y * -2.51 + time * 0.99) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
