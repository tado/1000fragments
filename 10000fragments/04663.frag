uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.30 * pow(abs(cos(ra * 2.0 + t * 2.95)), 1.01);
    v = sin((rr - pet) * 19.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.90, lr * 2.09 + time * -0.42); }
	{ p = vec2(atan(p.y, p.x) * 2.42, length(p) * 5.17 - time * 0.38); }
	p = rot2(p.y * 3.08 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 1.51, 1.51) + vec3(0.25, 0.00, 0.28);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 2.87 + time * 16.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
