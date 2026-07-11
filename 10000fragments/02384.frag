uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.12 * cos(sa * 6 + t * 1.42 + ph);
    v = sin((sr - petal) * 8.08);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	p *= 1.52;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 1.68 + time * -0.32); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.33, 0.21), vec3(0.88, 0.57, 0.96), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
