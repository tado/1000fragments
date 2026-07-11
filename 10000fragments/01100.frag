uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.31 + t * 4.47 + ph) + sin(p.y * 12.84 - t * 4.47 + ph)
        + sin((p.x + p.y) * 2.67 + t * 4.47 + ph) + sin(length(p) * 5.17 - t * 4.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = rot2(p.y * 1.88 + time * 0.72) * p;
	p = rot2(length(p) * -1.96 + time * 0.22) * p;
	p = rot2(1.77) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.31 * p.y + time * 0.71); p.y += 0.24 / wf * cos(wf * 2.92 * p.x + time * 1.57); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.03, vec3(0.47, 0.54, 0.42), vec3(0.31, 0.31, 0.43), vec3(1.14, 0.82, 0.91), vec3(0.35, 0.56, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
