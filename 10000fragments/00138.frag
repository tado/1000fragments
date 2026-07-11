uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.30 + t * 5.85 + ph) + sin(p.y * 15.29 - t * 1.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.54 * p.y + time * 1.17); p.y += 0.23 / wf * cos(wf * 1.56 * p.x + time * 1.06); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
