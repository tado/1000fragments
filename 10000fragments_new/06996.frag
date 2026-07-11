uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 6.52 * sin(t * 1.33) + t * 5.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.51, t * 2.25 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.15 * p.y + time * 0.75); p.y += 0.22 / wf * cos(wf * 1.94 * p.x + time * 0.65); }
	p = abs(p) - 0.54;
	p = rot2(1.22) * p;
	p += vec2(-0.21, -0.70) * sin(length(p) * 2.85 - time * 1.57) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.70 + time * 0.23, vec3(0.43, 0.42, 0.48), vec3(0.49, 0.45, 0.43), vec3(1.11, 1.19, 0.93), vec3(0.89, 0.09, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
