uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.58 + sin(p.y * 4.82 + t * 5.23) * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.67 * p.y + time * 1.78); p.y += 0.23 / wf * cos(wf * 3.29 * p.x + time * 2.19); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.43, -0.90) * sin(length(p) * 4.68 - time * 1.27) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.86));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
