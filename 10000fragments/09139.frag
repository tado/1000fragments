uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.98 * sin(mf + 3.0) + ph), cos(t * 1.98 * cos(mf + 3.0) + ph));
        ms += 0.100 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	p = rot2(1.53) * p;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.39 * p.y + time * 1.18); p.y += 0.50 / wf * cos(wf * 2.49 * p.x + time * 0.79); }
	p = rot2(length(p) * -1.48 + time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.96 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
