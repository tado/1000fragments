uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.20; vec2 jc = vec2(0.03 + 0.3 * sin(t * 0.54 + ph), -0.13 + 0.3 * cos(t * 0.32 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.58 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.60) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.76);
    float gsh = hash21(vec2(grow, floor(t * 9.09))) - 0.5;
    float gx = p.x + gsh * 0.61;
    v = sin(gx * 10.36 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.28));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(length(q2) * -2.30 + time * 1.28) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.73, length(q2) * 5.73 - time * 0.33); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d3 = fieldC(q3, time, 1.38);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.90 + time * 0.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
