uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.33 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.08) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.28;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 21.81 - t * 2.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.11) - 0.5;
	q1 *= 1.0 + 0.19 * sin(time * 3.40);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.49);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.20 + time * 0.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
