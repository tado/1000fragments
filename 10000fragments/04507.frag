uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 38.76 - t * 2.29 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 30.20 - t * 2.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	p = rot2(length(p) * -1.16 + time * 1.12) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.39 * p.y + time * 1.13); p.y += 0.38 / wf * cos(wf * 3.80 * p.x + time * 1.29); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.09, vec3(0.41, 0.44, 0.51), vec3(0.35, 0.33, 0.31), vec3(1.36, 0.77, 1.35), vec3(0.09, 0.32, 1.00));
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
