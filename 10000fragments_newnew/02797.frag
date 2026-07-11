uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.13; vec2 jc = vec2(0.02 + 0.3 * sin(t * 0.76 + ph), 0.75 + 0.3 * cos(t * 1.07 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.26 * jf)) * 0.38;
        xs += sin(length(p - im) * 111.18 - t * 12.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.70;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.33 + 0.13 * sin(t * 2.72 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.39 / wf * sin(wf * 3.89 * q1.y + time * 2.20); q1.y += 0.48 / wf * cos(wf * 2.99 * q1.x + time * 0.63); }
	q1 = rot2(length(q1) * 3.71 + time * 1.05) * q1;
	q2.y += sin(q2.x * 7.01 + time * 2.28) * 0.32;
	q3 += vec2(0.89, -0.32) * sin(length(q3) * 3.15 - time * 1.10) * 0.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d3 = fieldC(q3, time, 0.85);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.48 + time * 0.32, vec3(0.45, 0.53, 0.45), vec3(0.50, 0.37, 0.36), vec3(0.95, 1.38, 1.09), vec3(0.33, 0.40, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
