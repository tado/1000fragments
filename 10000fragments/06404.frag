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
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.28 * sin(mf + 3.0) + ph), cos(t * 2.28 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.43;
	p = rot2(0.97) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.21 * p.y + time * 1.93); p.y += 0.36 / wf * cos(wf * 3.06 * p.x + time * 0.66); }
	p += vec2(-0.68, -0.16) * sin(length(p) * 2.35 - time * 1.59) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.28, vec3(0.50, 0.50, 0.45), vec3(0.33, 0.40, 0.45), vec3(1.24, 0.78, 1.08), vec3(0.27, 0.08, 0.63));
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
