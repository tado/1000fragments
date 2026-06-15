uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.91 + sin(p.y * 1.66 + t * 2.80) * 4.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.46, length(p) * 3.62 - time * 0.69); }
	p = rot2(p.y * 3.02 + time * 0.49) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 2.03 + time * -0.75); }
	p *= 2.38;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.05));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
