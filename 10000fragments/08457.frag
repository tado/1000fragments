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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.47 * sin(mf + 3.0) + ph), cos(t * 0.47 * cos(mf + 3.0) + ph));
        ms += 0.059 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	p = rot2(length(p) * 1.52 + time * 0.98) * p;
	p = rot2(time * 1.18) * p;
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 4.82 - time * 0.31); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.23 * p.y + time * 1.73); p.y += 0.26 / wf * cos(wf * 3.34 * p.x + time * 1.64); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.23 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
