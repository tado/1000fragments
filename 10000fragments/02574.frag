uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.24 * cos(sa * 7 + t * 1.63 + ph);
    v = sin((sr - petal) * 17.19);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 1.72 + time * -0.56); }
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 5.19 - time * 0.14); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
