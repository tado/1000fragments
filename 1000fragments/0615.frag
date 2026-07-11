uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.13 * jf)) * 0.83;
        xs += sin(length(p - im) * 65.98 - t * 4.82 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.93 * p.y + time * 1.26); p.y += 0.42 / wf * cos(wf * 3.52 * p.x + time * 0.88); }
	p = rot2(0.34) * p;
	p = rot2(time * 0.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.28, vec3(0.46, 0.57, 0.48), vec3(0.45, 0.39, 0.37), vec3(1.07, 1.07, 1.08), vec3(0.09, 0.15, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
