uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.42 + vec2(t * 2.60, -t * 1.60) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.44) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.61 * p.y + time * 1.04); p.y += 0.26 / wf * cos(wf * 1.73 * p.x + time * 1.96); }
	p.y += sin(p.x * 7.47 + time * 2.23) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.06, vec3(0.41, 0.48, 0.41), vec3(0.30, 0.36, 0.32), vec3(1.00, 0.78, 1.39), vec3(0.06, 0.95, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
