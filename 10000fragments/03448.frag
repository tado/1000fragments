uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.53 - t * 2.51 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.32 + t * 3.18 + ph) + sin(p.y * 8.11 - t * 3.18 + ph)
        + sin((p.x + p.y) * 7.13 + t * 3.18 + ph) + sin(length(p) * 16.98 - t * 3.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.80 + time * 0.24) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.14 * p.y + time * 1.50); p.y += 0.33 / wf * cos(wf * 2.18 * p.x + time * 1.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.17);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.60 + time * 0.01, vec3(0.49, 0.48, 0.44), vec3(0.46, 0.37, 0.46), vec3(0.77, 0.84, 1.39), vec3(0.80, 0.98, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
