uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.42) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.70 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.43 * jf)) * 0.71;
        xs += sin(length(p - im) * 138.29 - t * 5.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * 0.55) * p;
	p = rot2(2.26) * p;
	p = rot2(p.y * -1.80 + time * 0.19) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.66 * p.y + time * 1.04); p.y += 0.47 / wf * cos(wf * 3.26 * p.x + time * 0.93); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.99);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.59 + time * 0.15, vec3(0.59, 0.50, 0.49), vec3(0.42, 0.43, 0.31), vec3(1.19, 0.71, 1.18), vec3(0.49, 0.24, 0.80));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
