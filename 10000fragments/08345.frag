uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.19 * cos(sa * 9 + t * 0.45 + ph);
    v = sin((sr - petal) * 11.47);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 2.92 + time * -0.23); }
	p = abs(p);
	p += vec2(-0.28, 0.82) * sin(length(p) * 5.72 - time * 0.59) * 0.37;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.00));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
