uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.48 * sin(mf + 3.0) + ph), cos(t * 2.48 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.73 * p.y + time * 1.44); p.y += 0.30 / wf * cos(wf * 3.80 * p.x + time * 1.28); }
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	p *= 1.85;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
