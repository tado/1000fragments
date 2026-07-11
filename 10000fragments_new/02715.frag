uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 9.55 - t * 6.17 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 21.27 - t * 4.25 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.42, lr * 2.17 + time * 0.95); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
