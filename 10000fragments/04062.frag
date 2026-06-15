uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.37 + vec2(t * 1.29, -t * 1.29) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	p = rot2(p.y * 2.73 + time * 0.46) * p;
	p = abs(p);
	p += vec2(-0.40, 0.66) * sin(length(p) * 5.20 - time * 1.98) * 0.35;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 2.65 + time * -0.34); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.88));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
