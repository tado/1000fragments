uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.38 + vec2(t * 1.94, -t * 1.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.60) * p;
	p = rot2(p.y * 2.11 + time * 0.92) * p;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.12, lr * 1.78 + time * 0.36); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.77));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
