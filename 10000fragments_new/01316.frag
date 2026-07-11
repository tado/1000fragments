uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.16 + vec2(t * 1.92, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.70) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 1.09 + time * -0.72); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.41, 0.31, 0.45) * (0.16 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
