uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.71 + vec2(t * 2.85, -t * 2.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.87 + time * 0.32) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.68 + time * 0.27); }
	p = abs(p) - 0.62;
	p += vec2(0.17, -0.05) * sin(length(p) * 3.82 - time * 1.81) * 0.37;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
