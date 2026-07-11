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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.54 * sin(mf + 3.0) + ph), cos(t * 0.54 * cos(mf + 3.0) + ph));
        ms += 0.061 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.66 * p.y + time * 0.63); p.y += 0.47 / wf * cos(wf * 3.91 * p.x + time * 1.76); }
	p = rot2(0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.24 + time * 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
