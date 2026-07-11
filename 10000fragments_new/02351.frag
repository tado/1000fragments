uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.36 - t * 4.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p = fract(p * 2.83) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 2.60 + time * 0.36); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.39, 0.11), vec3(0.79, 0.84, 0.64), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
