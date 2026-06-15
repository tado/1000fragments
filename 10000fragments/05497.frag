uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.20 + t * 4.95 + ph) + sin(p.y * 3.21 - t * 4.95 + ph)
        + sin((p.x + p.y) * 5.89 + t * 4.95 + ph) + sin(length(p) * 9.88 - t * 4.95 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.25 + time * 0.56) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.09 * p.y + time * 0.62); p.y += 0.36 / wf * cos(wf * 1.66 * p.x + time * 0.72); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.04, vec3(0.54, 0.55, 0.44), vec3(0.34, 0.36, 0.44), vec3(0.75, 0.75, 1.36), vec3(0.39, 0.98, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
