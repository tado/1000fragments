uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 28.76 - t * 5.67 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 25.51 - t * 7.91 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = fract(p * 1.24) - 0.5;
	p = (floor(p * 6.4) + 0.5) / 6.4;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.93 + time * 0.80); }
	p *= 2.40;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.90));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
