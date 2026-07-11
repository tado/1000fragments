uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.69;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.70 - t * 2.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 1.42 + time * 0.27); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.61));
	{ p = vec2(atan(p.y, p.x) * 2.87, length(p) * 3.95 - time * 0.32); }
	p = fract(p * 2.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.51, 0.82, 0.54) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
