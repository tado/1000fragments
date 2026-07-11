uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.49 + sin(p.y * 3.51 + t * 2.16) * 1.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.28, lr * 1.07 + time * 0.63); }
	p = (floor(p * 22.0) + 0.5) / 22.0;
	{ p = vec2(atan(p.y, p.x) * 2.34, length(p) * 4.16 - time * 0.57); }
	p = abs(p) - 0.69;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.24, 0.91) * (0.09 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
