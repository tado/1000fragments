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
        vec2 mm = vec2(sin(t * 1.62 * sin(mf + 3.0) + ph), cos(t * 1.62 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.04 + sin(p.y * 2.40 + t * 3.35) * 3.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.51 * p.y + time * 1.33); p.y += 0.26 / wf * cos(wf * 3.07 * p.x + time * 0.76); }
	p += vec2(-0.40, 0.59) * sin(length(p) * 2.52 - time * 1.19) * 0.25;
	p = rot2(time * -1.02) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.02, vec3(0.60, 0.45, 0.53), vec3(0.37, 0.30, 0.43), vec3(1.16, 0.89, 0.75), vec3(0.87, 0.24, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
