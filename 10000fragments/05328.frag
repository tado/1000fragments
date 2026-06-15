uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.08 + vec2(t * 1.75, -t * 1.75) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.35 * p.y + time * 1.36); p.y += 0.31 / wf * cos(wf * 3.56 * p.x + time * 1.01); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(1.70) * p; }
	{ float fr = length(p); p *= 1.0 + 0.57 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.20, vec3(0.53, 0.42, 0.42), vec3(0.44, 0.48, 0.41), vec3(1.02, 0.90, 0.99), vec3(0.73, 0.86, 0.53));
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
