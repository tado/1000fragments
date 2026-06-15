uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.87 + t * 0.90 + ph) + sin(p.y * 7.09 - t * 0.90 + ph)
        + sin((p.x + p.y) * 5.22 + t * 0.90 + ph) + sin(length(p) * 9.91 - t * 0.90 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.70; vec2 jc = vec2(0.01 + 0.3 * sin(t * 1.34 + ph), 0.24 + 0.3 * cos(t * 1.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	p = rot2(time * -1.38) * p;
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 5.68 - time * 0.72); }
	p = rot2(2.57) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = d1 + d2;
	vec3 col = palette(d * 1.34 + time * 0.10, vec3(0.45, 0.57, 0.51), vec3(0.31, 0.42, 0.42), vec3(0.95, 1.29, 1.38), vec3(0.35, 0.17, 0.87));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
