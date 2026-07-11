uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.17 * jf)) * 0.71;
        xs += sin(length(p - im) * 143.08 - t * 9.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.10 * jf)) * 0.45;
        xs += sin(length(p - im) * 112.63 - t * 11.39 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.29 * p.y + time * 1.43); p.y += 0.43 / wf * cos(wf * 2.77 * p.x + time * 0.73); }
	p += vec2(0.13, -0.03) * sin(length(p) * 4.90 - time * 0.61) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.37 + time * 0.04, vec3(0.50, 0.51, 0.54), vec3(0.37, 0.48, 0.49), vec3(1.24, 1.29, 0.79), vec3(0.45, 0.80, 0.09));
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
