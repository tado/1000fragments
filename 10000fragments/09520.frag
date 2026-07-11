uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.34 + t * 3.72 + ph) + sin(p.y * 10.72 - t * 5.43 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.15 + 0.3 * sin(t * 0.67 + ph), 0.38 + 0.3 * cos(t * 0.67 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.95) * p;
	p = rot2(time * -0.36) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.26; p = rot2(1.83) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.33 + time * 0.29, vec3(0.42, 0.43, 0.44), vec3(0.36, 0.34, 0.48), vec3(0.98, 0.72, 0.95), vec3(0.81, 0.59, 0.40));
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
