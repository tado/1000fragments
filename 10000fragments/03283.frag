uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.14 + t * 2.84 + ph) + sin(p.y * 2.93 - t * 2.84 + ph)
        + sin((p.x + p.y) * 8.39 + t * 2.84 + ph) + sin(length(p) * 3.05 - t * 2.84 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	p = rot2(1.82) * p;
	p = rot2(p.y * 3.96 + time * 0.87) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.82 + time * -0.19); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.69, 1.17, 1.03) + vec3(0.24, 0.08, 0.23);
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
