uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.66 + vec2(t * 2.84, -t * 2.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 2.86 + time * -0.44); }
	{ p = vec2(atan(p.y, p.x) * 2.42, length(p) * 4.89 - time * 0.53); }
	p += vec2(-0.55, -0.13) * sin(length(p) * 2.87 - time * 1.48) * 0.18;
	p *= 1.53;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 1.25, 0.55) + vec3(0.27, 0.15, 0.08);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
