uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 11.05 - t * 7.73 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 24.24 - t * 7.73 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.27 * jf)) * 0.73;
        xs += sin(length(p - im) * 145.80 - t * 9.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p = rot2(time * -1.24) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.08 * p.y + time * 1.81); p.y += 0.28 / wf * cos(wf * 1.76 * p.x + time * 1.19); }
	p = fract(p * 1.19) - 0.5;
	p = rot2(length(p) * 1.42 + time * 0.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.09, vec3(0.50, 0.44, 0.48), vec3(0.45, 0.39, 0.50), vec3(1.39, 1.30, 1.12), vec3(0.07, 0.76, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
