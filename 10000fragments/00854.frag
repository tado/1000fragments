uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.18 + sin(p.y * 4.80 + t * 5.60) * 1.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.37, lr * 1.81 + time * 0.76); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.98, 1.44, 1.24) + vec3(0.19, 0.10, 0.11);
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
