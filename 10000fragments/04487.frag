uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.47 * sin(mf + 3.0) + ph), cos(t * 1.47 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.15) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.55 * p.y + time * 1.90); p.y += 0.38 / wf * cos(wf * 3.28 * p.x + time * 0.90); }
	{ p = vec2(atan(p.y, p.x) * 1.42, length(p) * 3.13 - time * 0.54); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.06, vec3(0.53, 0.40, 0.55), vec3(0.33, 0.48, 0.35), vec3(0.71, 1.40, 1.13), vec3(0.91, 0.26, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
