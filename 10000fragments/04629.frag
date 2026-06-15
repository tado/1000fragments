uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.91; vec2 jc = vec2(-0.10 + 0.3 * sin(t * 0.29 + ph), -0.15 + 0.3 * cos(t * 0.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.89 + t * 1.03 + ph) + sin(p.y * 6.28 - t * 2.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.07, vec3(0.49, 0.43, 0.59), vec3(0.39, 0.46, 0.42), vec3(1.09, 0.99, 0.91), vec3(0.55, 0.18, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
