uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 14.02 - t * 6.10 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 12.19 - t * 7.06 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.96 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.26 + t * 1.77 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.05, length(q1) * 5.91 - time * 0.28); }
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.12; q2 = rot2(1.35) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.50);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.43));
	vec3 col = hue(d * 0.77 + time * 0.03);
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
