uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.64 + vec2(t * 1.73, -t * 1.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.49 * p.y + time * 1.55); p.y += 0.30 / wf * cos(wf * 3.33 * p.x + time * 1.45); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.81 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
