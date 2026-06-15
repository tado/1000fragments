uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 35.25 - t * 3.12 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 32.30 - t * 3.12 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.15 * jf)) * 0.63;
        xs += sin(length(p - im) * 215.79 - t * 13.49 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p = rot2(p.y * -3.99 + time * 0.40) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.83 * p.y + time * 0.73); p.y += 0.37 / wf * cos(wf * 3.33 * p.x + time * 1.90); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.59 + time * 0.12, vec3(0.41, 0.50, 0.42), vec3(0.41, 0.45, 0.39), vec3(1.22, 1.32, 0.85), vec3(0.38, 0.22, 0.05));
	col = mod(col * 2.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
