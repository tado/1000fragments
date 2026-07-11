uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.26 * cos(sa * 7.0 + t * 1.57 + ph);
    v = sin((sr - petal) * 16.52);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 2.63 + time * 0.94); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.66), field(p, time, 1.31));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
