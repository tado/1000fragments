uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.79 + t * 2.26 + ph) + sin(p.y * 12.45 - t * 2.26 + ph)
        + sin((p.x + p.y) * 5.11 + t * 2.26 + ph) + sin(length(p) * 7.53 - t * 2.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.46 + time * -0.41); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.63));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
