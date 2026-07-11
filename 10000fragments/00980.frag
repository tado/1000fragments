uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.58 + t * 4.50 + ph) + sin(p.y * 12.89 - t * 4.50 + ph)
        + sin((p.x + p.y) * 8.36 + t * 4.50 + ph) + sin(length(p) * 4.01 - t * 4.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	p = fract(p * 1.54) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.32 * p.y + time * 1.24); p.y += 0.43 / wf * cos(wf * 1.75 * p.x + time * 0.65); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 1.30 + time * 0.57); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
