uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.26 * cos(sa * 9.0 + t * 1.96 + ph);
    v = sin((sr - petal) * 8.49);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	p = rot2(2.09) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 2.26 + time * -0.64); }
	p = rot2(time * 1.08) * p;
	p = rot2(p.y * -1.41 + time * 0.84) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.35));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
