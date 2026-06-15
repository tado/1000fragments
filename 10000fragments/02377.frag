uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.21 * cos(sa * 5 + t * 1.18 + ph);
    v = sin((sr - petal) * 11.03);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.01) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.17, lr * 1.34 + time * 0.74); }
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 5.81 - time * 0.78); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
