uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.44 * sin(mf + 3.0) + ph), cos(t * 0.44 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 4.65 - time * 0.76); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.06 * p.y + time * 1.90); p.y += 0.22 / wf * cos(wf * 1.82 * p.x + time * 0.96); }
	p = rot2(p.y * -1.92 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.22, vec3(0.49, 0.43, 0.60), vec3(0.35, 0.48, 0.47), vec3(0.77, 0.92, 0.78), vec3(0.18, 0.49, 0.01));
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
