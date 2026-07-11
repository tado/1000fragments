uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.80 + vec2(t * 1.71, -t * 1.71) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.05 * p.y + time * 1.97); p.y += 0.42 / wf * cos(wf * 2.38 * p.x + time * 1.19); }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.28; p = rot2(1.96) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.09, vec3(0.51, 0.51, 0.53), vec3(0.49, 0.43, 0.41), vec3(0.89, 1.37, 1.29), vec3(0.10, 0.80, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
