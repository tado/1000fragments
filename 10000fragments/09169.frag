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
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.30 * jf)) * 0.64;
        xs += sin(length(p - im) * 192.71 - t * 5.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.53; p = rot2(0.75) * p; }
	p = fract(p * 1.22) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 2.66 * p.y + time * 1.94); p.y += 0.25 / wf * cos(wf * 1.92 * p.x + time * 1.34); }
	p += vec2(0.41, 0.34) * sin(length(p) * 2.69 - time * 1.22) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.11, vec3(0.44, 0.50, 0.47), vec3(0.40, 0.36, 0.31), vec3(1.40, 0.80, 0.77), vec3(0.47, 0.04, 0.30));
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
