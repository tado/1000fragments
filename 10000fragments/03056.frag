uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.90 + vec2(t * 2.34, -t * 2.34) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 2.59 - time * 0.11); }
	p = rot2(p.y * 1.37 + time * 0.69) * p;
	p = rot2(time * 0.61) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.79 + time * 0.44); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 1.58, 1.50) + vec3(0.26, 0.20, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
