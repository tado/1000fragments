uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.12 + t * 2.97 + ph) * 0.7;
    float wb = sin(p.y * 15.68 - t * 2.23 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.68 * p.y + time * 1.06); p.y += 0.28 / wf * cos(wf * 3.79 * p.x + time * 1.58); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.68;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.24, 0.31), vec3(0.58, 0.52, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
