uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.29 + vec2(t * 2.38, -t * 2.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 30.04 - t * 1.85 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 19.29 - t * 1.85 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	p = rot2(1.23) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.65 * p.y + time * 0.73); p.y += 0.38 / wf * cos(wf * 2.85 * p.x + time * 0.90); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.47, 0.57, 0.43), vec3(0.44, 0.39, 0.33), vec3(1.11, 1.16, 1.06), vec3(0.66, 0.32, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
