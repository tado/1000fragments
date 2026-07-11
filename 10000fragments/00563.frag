uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.76 + sin(p.y * 5.36 + t * 0.87) * 2.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.09) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 4.07 - time * 0.20); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.12, lr * 1.80 + time * 0.65); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.16, 0.50), vec3(0.96, 0.90, 0.82), d);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
