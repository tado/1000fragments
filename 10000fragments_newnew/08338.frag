uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 10.71 - t * 2.77 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 30.12 - t * 3.62 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.51 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 29.5) + 0.5) / 29.5;
	q1 += vec2(-0.33, -0.51) * sin(length(q1) * 4.73 - time * 1.87) * 0.35;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.57; q2 = rot2(2.51) * q2; }
	q2 = rot2(q2.y * -3.61 + time * 1.09) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d = d1 * d2;
	vec3 col = hue(d * 1.01 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
