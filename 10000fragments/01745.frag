uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.66 - t * 5.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.33 + time * 0.30) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.55 * p.y + time * 1.59); p.y += 0.27 / wf * cos(wf * 2.68 * p.x + time * 1.27); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.30; p = rot2(1.02) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.19, vec3(0.54, 0.49, 0.48), vec3(0.33, 0.35, 0.48), vec3(0.98, 0.71, 0.77), vec3(0.25, 0.90, 0.42));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
