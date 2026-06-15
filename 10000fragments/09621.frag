uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.01 + t * 1.53 + ph) + sin(p.y * 7.97 - t * 1.53 + ph)
        + sin((p.x + p.y) * 10.07 + t * 1.53 + ph) + sin(length(p) * 8.52 - t * 1.53 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.73 - t * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.38 * p.y + time * 1.33); p.y += 0.24 / wf * cos(wf * 3.67 * p.x + time * 1.94); }
	p = rot2(length(p) * 3.10 + time * 0.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = d1 + d2;
	vec3 col = palette(d * 0.65 + time * 0.07, vec3(0.47, 0.57, 0.43), vec3(0.36, 0.34, 0.39), vec3(1.24, 1.24, 0.72), vec3(0.54, 0.96, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
