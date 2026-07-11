uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.49; vec2 jc = vec2(-0.48 + 0.3 * sin(t * 1.17 + ph), -0.07 + 0.3 * cos(t * 1.17 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 31.39 - t * 5.38 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 14.69 - t * 5.38 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 4.48 - time * 0.24); }
	p = rot2(p.y * -2.66 + time * 0.13) * p;
	p = rot2(time * -1.00) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.88);
	float d = d1 + d2;
	vec3 col = palette(d * 0.98 + time * 0.16, vec3(0.50, 0.44, 0.50), vec3(0.43, 0.33, 0.37), vec3(0.95, 1.00, 1.37), vec3(0.11, 0.16, 0.72));
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
