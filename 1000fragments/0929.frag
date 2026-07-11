uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.52 + vec2(t * 2.26, -t * 2.26) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.41 * p.y + time * 1.67); p.y += 0.22 / wf * cos(wf * 3.60 * p.x + time * 0.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.28, vec3(0.56, 0.60, 0.41), vec3(0.32, 0.41, 0.32), vec3(0.99, 0.75, 1.17), vec3(0.43, 0.43, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
