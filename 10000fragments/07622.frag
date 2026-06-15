uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 22.97 - t * 1.43 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 34.72 - t * 1.43 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 2.43 + time * -0.70); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
