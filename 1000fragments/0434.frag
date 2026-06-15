uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.79 * sin(mf + 3.0) + ph), cos(t * 1.79 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.54 * p.y + time * 0.78); p.y += 0.27 / wf * cos(wf * 3.60 * p.x + time * 1.59); }
	p += vec2(-0.88, -0.16) * sin(length(p) * 2.15 - time * 1.00) * 0.37;
	p *= 2.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.25, vec3(0.52, 0.56, 0.47), vec3(0.50, 0.30, 0.38), vec3(1.24, 1.21, 1.17), vec3(0.39, 0.54, 0.36));
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
