uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.31 + t * 2.49 + ph) + sin(p.y * 5.81 - t * 2.49 + ph)
        + sin((p.x + p.y) * 5.86 + t * 2.49 + ph) + sin(length(p) * 17.19 - t * 2.49 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.22 - t * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.54 * p.y + time * 1.45); p.y += 0.50 / wf * cos(wf * 3.92 * p.x + time * 1.27); }
	p = rot2(2.48) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.54 + time * 0.14, vec3(0.54, 0.49, 0.50), vec3(0.33, 0.48, 0.42), vec3(0.96, 1.02, 1.17), vec3(0.14, 0.57, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
