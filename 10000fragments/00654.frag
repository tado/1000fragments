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
        float ang = ff * 2.3999632 + t * 0.96 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.12 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.12) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	p.y += sin(p.x * 4.33 + time * 3.85) * 0.29;
	p *= 1.77;
	p = (floor(p * 12.5) + 0.5) / 12.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.25, vec3(0.50, 0.48, 0.42), vec3(0.31, 0.33, 0.38), vec3(1.03, 1.16, 1.28), vec3(0.30, 0.59, 0.95));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
