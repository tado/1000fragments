uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.47 * sin(mf + 3.0) + ph), cos(t * 1.47 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	p = fract(p * 1.67) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 1.87 * p.y + time * 1.82); p.y += 0.33 / wf * cos(wf * 1.65 * p.x + time * 0.89); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.56, 0.51) + vec3(0.10, 0.24, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
