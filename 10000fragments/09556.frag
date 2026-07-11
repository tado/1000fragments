uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.78 + t * 2.30 + ph) + sin(p.y * 11.73 - t * 2.30 + ph)
        + sin((p.x + p.y) * 11.82 + t * 2.30 + ph) + sin(length(p) * 9.45 - t * 2.30 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.75 + 0.3 * sin(t * 1.44 + ph), 0.03 + 0.3 * cos(t * 1.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	p *= 1.49;
	{ p = vec2(atan(p.y, p.x) * 1.06, length(p) * 4.59 - time * 0.71); }
	p += vec2(-0.92, -0.04) * sin(length(p) * 4.44 - time * 1.07) * 0.36;
	p = rot2(1.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.76 + time * 0.23, vec3(0.51, 0.45, 0.56), vec3(0.33, 0.37, 0.41), vec3(0.86, 1.29, 1.03), vec3(0.51, 0.29, 0.71));
	col = clamp((col - 0.5) * 1.89 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
