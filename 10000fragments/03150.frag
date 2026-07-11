uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.48 + vec2(t * 0.99, -t * 0.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 4.29 - time * 0.70); }
	p *= 2.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.90, lr * 2.99 + time * -0.57); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.39, 0.44), vec3(0.97, 0.60, 0.48), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
