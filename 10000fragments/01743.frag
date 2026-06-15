uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.50 + t * 3.15 + ph) + sin(p.y * 3.70 - t * 5.57 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.63 + jf * 4.0), cos(t * 0.38 * jf)) * 0.46;
        xs += sin(length(p - im) * 96.05 - t * 9.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.96 * p.y + time * 1.83); p.y += 0.36 / wf * cos(wf * 2.53 * p.x + time * 1.20); }
	p = rot2(p.y * -3.41 + time * 0.47) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = d1 * d2;
	vec3 col = palette(d * 0.60 + time * 0.24, vec3(0.47, 0.44, 0.48), vec3(0.49, 0.34, 0.31), vec3(1.24, 1.28, 1.09), vec3(0.04, 0.15, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
