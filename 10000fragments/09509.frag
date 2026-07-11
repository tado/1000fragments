uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.99; vec2 jc = vec2(0.11 + 0.3 * sin(t * 1.21 + ph), 0.01 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.74, t * 0.93 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.18);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.23, vec3(0.58, 0.45, 0.59), vec3(0.31, 0.38, 0.38), vec3(1.03, 1.17, 0.76), vec3(0.91, 0.61, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
