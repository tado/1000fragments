uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.60 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.55) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.71);
    float gsh = hash21(vec2(grow, floor(t * 4.01))) - 0.5;
    float gx = p.x + gsh * 1.20;
    v = sin(gx * 19.79 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.06));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.68));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.42, 1.03, 1.10) + vec3(0.16, 0.22, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
