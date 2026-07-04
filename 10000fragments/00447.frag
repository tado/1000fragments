uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.66;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.91) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.65) * sin(3.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.87 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = fract(p * 2.52) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.65 + time * 0.23, vec3(0.54, 0.50, 0.45), vec3(0.43, 0.33, 0.39), vec3(0.82, 1.06, 1.06), vec3(0.67, 0.34, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
