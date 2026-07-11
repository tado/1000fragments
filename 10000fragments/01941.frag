uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.72 + sr * 18.93 - t * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.21, lr * 2.31 + time * -0.17); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p = abs(p) - 0.76;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.26));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
