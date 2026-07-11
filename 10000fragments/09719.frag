uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.93; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 0.52 + ph), 0.77 + 0.3 * cos(t * 0.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.14 - t * 5.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.19) * p;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = d1 * d2;
	vec3 col = palette(d * 1.73 + time * 0.18, vec3(0.51, 0.45, 0.42), vec3(0.39, 0.34, 0.34), vec3(1.20, 1.05, 0.89), vec3(0.98, 0.29, 0.77));
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
