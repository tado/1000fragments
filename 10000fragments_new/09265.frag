uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.40 + 0.41 * sin(t * 0.74)) + vec2(-0.71, 0.30) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.39;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.28) * kp; kp *= 1.44; }
    v = sin(kp.x * 1.80 - t * 1.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.21 * p.y + time * 1.86); p.y += 0.26 / wf * cos(wf * 3.92 * p.x + time * 1.40); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.72 + time * 0.06, vec3(0.55, 0.56, 0.50), vec3(0.49, 0.44, 0.31), vec3(1.13, 1.21, 1.01), vec3(0.09, 0.44, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
