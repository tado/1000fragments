uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 12.48 - t * 1.82 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 28.70 - t * 1.82 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.01 + vec2(t * 2.12, -t * 2.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.37) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.50 * p.y + time * 1.33); p.y += 0.20 / wf * cos(wf * 2.34 * p.x + time * 1.20); }
	p = rot2(p.y * 2.71 + time * 0.90) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.17);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.26, vec3(0.42, 0.52, 0.56), vec3(0.38, 0.42, 0.45), vec3(1.02, 0.75, 0.87), vec3(0.84, 0.38, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
