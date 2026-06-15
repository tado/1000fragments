uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.56 + sr * 21.58 - t * 0.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.24 + t * 4.89 + ph) + sin(p.y * 15.28 - t * 2.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.86 * p.y + time * 0.92); p.y += 0.45 / wf * cos(wf * 2.49 * p.x + time * 0.97); }
	p = abs(p) - 0.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.75 + time * 0.19, vec3(0.49, 0.42, 0.52), vec3(0.35, 0.32, 0.48), vec3(0.95, 0.95, 1.34), vec3(0.69, 0.78, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
