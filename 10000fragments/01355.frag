uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.30 + t * 3.05 + ph) + sin(p.y * 7.40 - t * 3.05 + ph)
        + sin((p.x + p.y) * 6.00 + t * 3.05 + ph) + sin(length(p) * 14.60 - t * 3.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.04, lr * 2.49 + time * -0.44); }
	p = abs(p) - 0.59;
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
