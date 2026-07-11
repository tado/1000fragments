uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.06 * sin(mf + 3.0) + ph), cos(t * 1.06 * cos(mf + 3.0) + ph));
        ms += 0.095 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.73 * p.y + time * 1.80); p.y += 0.44 / wf * cos(wf * 1.68 * p.x + time * 1.84); }
	p = rot2(length(p) * 1.57 + time * 0.82) * p;
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.13, 0.57), vec3(0.67, 0.56, 0.91), d);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
