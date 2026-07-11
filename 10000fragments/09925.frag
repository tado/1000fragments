uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.75 + sr * 13.68 - t * 3.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(0.16 + 0.3 * sin(t * 1.07 + ph), -0.75 + 0.3 * cos(t * 1.07 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -3.74 + time * 0.81) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 2.98 + time * 0.82) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.26 + time * 0.09, vec3(0.47, 0.60, 0.44), vec3(0.43, 0.40, 0.39), vec3(0.80, 0.76, 1.22), vec3(0.59, 0.07, 0.94));
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
