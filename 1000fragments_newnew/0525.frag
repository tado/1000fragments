uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.48 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.89) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 35.72 - t * 6.59 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 35.49 - t * 5.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.69) * 0.75));
	q1.y += sin(q1.x * 6.69 + (time * 0.69) * 2.07) * 0.21;
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 0.53);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.56, 0.58, 0.45) + vec3(0.12, 0.06, 0.08);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.916, 1.000, 1.052) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
