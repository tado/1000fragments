uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.29 + vec2(t * 0.48, -t * 0.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.60 * p.y + time * 1.89); p.y += 0.45 / wf * cos(wf * 3.40 * p.x + time * 1.17); }
	p = rot2(time * -1.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.11, vec3(0.42, 0.43, 0.48), vec3(0.34, 0.45, 0.35), vec3(1.21, 1.21, 1.18), vec3(0.87, 0.17, 0.88));
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
