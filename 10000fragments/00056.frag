uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.92 + t * 3.57 + ph) + sin(p.y * 17.58 - t * 5.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.41 + time * 0.52); }
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	p = abs(p) - 0.75;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
