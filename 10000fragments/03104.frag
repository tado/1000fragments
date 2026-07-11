uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.32 + vec2(t * 1.02, -t * 1.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 1.28 + time * 0.62); }
	p = rot2(p.y * -3.68 + time * 0.93) * p;
	p = rot2(length(p) * -3.57 + time * 0.62) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
