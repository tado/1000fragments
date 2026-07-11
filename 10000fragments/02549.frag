uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.28 * cos(sa * 6 + t * 0.58 + ph);
    v = sin((sr - petal) * 12.01);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.12, 0.10) * sin(length(p) * 2.46 - time * 1.50) * 0.19;
	p = fract(p * 1.23) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 1.62 + time * -0.27); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.19, 0.58), vec3(0.67, 0.67, 0.96), d);
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
