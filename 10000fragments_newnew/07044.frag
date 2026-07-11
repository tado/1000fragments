uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.17 * cos(sa * 4.0 + t * 1.09 + ph);
    v = sin((sr - petal) * 15.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = sin(p * 2.96 + time * 2.35) * 1.28;
	p = rot2(time * 1.38) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.22, lr * 2.32 + time * 0.22); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.05;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.32), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
