uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.11 + t * 1.82 + ph) + sin(p.y * 8.43 - t * 1.82 + ph)
        + sin((p.x + p.y) * 3.61 + t * 1.82 + ph) + sin(length(p) * 5.73 - t * 1.82 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.32 + t * 3.47 + ph) * 0.7;
    float wb = sin(p.y * 17.01 - t * 0.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -1.54 + time * 1.34) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.27 * p.y + time * 1.74); p.y += 0.47 / wf * cos(wf * 2.47 * p.x + time * 1.27); }
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p += vec2(-0.94, -0.38) * sin(length(p) * 3.97 - time * 2.24) * 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.56 + time * 0.25, vec3(0.45, 0.53, 0.53), vec3(0.43, 0.49, 0.32), vec3(0.72, 0.96, 1.11), vec3(0.09, 0.91, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
