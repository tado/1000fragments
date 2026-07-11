uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.63 * sin(mf + 3.0) + ph), cos(t * 0.63 * cos(mf + 3.0) + ph));
        ms += 0.034 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.31 * p.y + time * 1.53); p.y += 0.45 / wf * cos(wf * 3.35 * p.x + time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.07, vec3(0.52, 0.46, 0.52), vec3(0.41, 0.37, 0.48), vec3(0.90, 1.16, 1.27), vec3(0.98, 0.55, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
