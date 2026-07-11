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
        float ang = ff * 2.3999632 + t * 0.79 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.75) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(-0.39 + 0.3 * sin(t * 1.50 + ph), -0.40 + 0.3 * cos(t * 0.72 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 5.27 - time * 0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.33 + time * 0.30, vec3(0.49, 0.46, 0.59), vec3(0.32, 0.31, 0.34), vec3(1.22, 1.04, 1.05), vec3(0.18, 0.29, 0.30));
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 2.09 + time * 9.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
