uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.69 + t * 1.36 + ph) + sin(p.y * 6.63 - t * 1.45 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.70) * p;
	p = fract(p * 1.06) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.39, lr * 1.69 + time * 0.98); }
	p = rot2(length(p) * -3.72 + time * 1.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.19, 0.76, 0.49) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.95 + time * 14.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
