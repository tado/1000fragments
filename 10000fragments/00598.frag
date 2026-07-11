uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.97 + sin(p.y * 3.87 + t * 1.43) * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.15, lr * 1.35 + time * -0.18); }
	{ float fr = length(p); p *= 1.0 + -0.55 * fr * fr; }
	p = fract(p * 2.21) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.17, 0.34), vec3(1.00, 0.55, 0.48), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
