uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.23 + t * 1.81 + ph) + sin(p.y * 10.63 - t * 1.81 + ph)
        + sin((p.x + p.y) * 8.87 + t * 1.81 + ph) + sin(length(p) * 13.03 - t * 1.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.39; vec2 jc = vec2(0.04 + 0.3 * sin(t * 1.24 + ph), 0.36 + 0.3 * cos(t * 1.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	p = rot2(2.24) * p;
	p *= 3.06;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = d1 + d2;
	vec3 col = palette(d * 1.64 + time * 0.10, vec3(0.59, 0.49, 0.47), vec3(0.42, 0.35, 0.31), vec3(0.87, 0.85, 1.12), vec3(0.26, 0.55, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
