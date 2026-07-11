uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.94 + vec2(t * 1.58, -t * 1.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	p = rot2(time * 0.43) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.06, lr * 2.33 + time * -0.46); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
