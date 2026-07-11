uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.54 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.25) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.46 - t * 4.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.59;
	float d1 = fieldA(q1, (time * 0.54), 0.0);
	float d2 = fieldB(q2, (time * 0.54), 1.00);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.06, 0.08), vec3(0.88, 0.80, 0.87), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.025, 0.949) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
