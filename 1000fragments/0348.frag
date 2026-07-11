uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.56 + sin(p.y * 5.03 + t * 4.22) * 3.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 1.62 * p.y + time * 0.85); p.y += 0.42 / wf * cos(wf * 2.01 * p.x + time * 1.35); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.39));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
