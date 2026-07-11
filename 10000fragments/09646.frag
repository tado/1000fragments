uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.57 + t * 1.69 + ph) + sin(p.y * 2.77 - t * 1.75 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.19; vec2 jc = vec2(-0.32 + 0.3 * sin(t * 0.34 + ph), 0.38 + 0.3 * cos(t * 0.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = d1 + d2;
	vec3 col = palette(d * 1.32 + time * 0.20, vec3(0.45, 0.48, 0.50), vec3(0.32, 0.49, 0.33), vec3(1.01, 0.75, 1.29), vec3(0.83, 0.69, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
