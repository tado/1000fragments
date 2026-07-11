uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.51 + 0.3 * sin(t * 0.38 + ph), 0.07 + 0.3 * cos(t * 1.06 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 33.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.57 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.60) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.13, -0.74) * sin(length(p) * 4.13 - time * 1.07) * 0.21;
	p = rot2(2.14) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = d1 * d2;
	vec3 col = palette(d * 1.58 + time * 0.02, vec3(0.56, 0.46, 0.53), vec3(0.34, 0.43, 0.45), vec3(0.83, 1.37, 1.32), vec3(0.19, 0.11, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
