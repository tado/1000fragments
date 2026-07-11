uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(0.25 + 0.3 * sin(t * 1.48 + ph), 0.27 + 0.3 * cos(t * 1.64 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.48 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.48) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -3.99 + time * 0.96) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.47));
	vec3 col = palette(d * 1.48 + time * 0.27, vec3(0.55, 0.56, 0.56), vec3(0.37, 0.38, 0.38), vec3(1.38, 0.76, 0.83), vec3(0.75, 0.99, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
