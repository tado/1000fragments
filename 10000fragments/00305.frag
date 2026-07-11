uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.23 + t * 2.90 + ph) + sin(p.y * 15.87 - t * 4.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.68 * p.y + time * 2.00); p.y += 0.37 / wf * cos(wf * 1.75 * p.x + time * 1.75); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 1.34 + time * -0.58); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
