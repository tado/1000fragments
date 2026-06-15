uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(-0.72 + 0.3 * sin(t * 0.87 + ph), 0.34 + 0.3 * cos(t * 0.87 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.60 + t * 4.43 + ph) + sin(p.y * 11.22 - t * 4.43 + ph)
        + sin((p.x + p.y) * 10.51 + t * 4.43 + ph) + sin(length(p) * 5.71 - t * 4.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.34) * p;
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 5.75 - time * 0.56); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 0.41) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.13 + time * 0.01, vec3(0.57, 0.49, 0.59), vec3(0.38, 0.48, 0.37), vec3(1.14, 1.22, 0.96), vec3(0.85, 0.24, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
