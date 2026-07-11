uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.31 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.25 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.15) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.21, vec3(0.42, 0.57, 0.42), vec3(0.40, 0.43, 0.50), vec3(1.20, 1.03, 1.18), vec3(0.53, 0.55, 0.98));
	col *= 0.90 + 0.19 * sin(gl_FragCoord.y * 1.19 + time * 5.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
