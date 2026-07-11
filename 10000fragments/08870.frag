uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.75 * sin(mf + 3.0) + ph), cos(t * 0.75 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	p = rot2(length(p) * -2.41 + time * 0.75) * p;
	p = rot2(p.y * 1.38 + time * 0.82) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.57 * p.y + time * 0.90); p.y += 0.28 / wf * cos(wf * 3.22 * p.x + time * 1.53); }
	p = rot2(0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 1.23, 1.43) + vec3(0.01, 0.13, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
