uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.36 + vec2(t * 2.11, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.89 * p.y + time * 0.91); p.y += 0.21 / wf * cos(wf * 3.82 * p.x + time * 1.57); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.95 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
