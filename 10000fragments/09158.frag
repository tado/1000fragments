uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.58; vec2 jc = vec2(-0.44 + 0.3 * sin(t * 0.55 + ph), 0.06 + 0.3 * cos(t * 0.55 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.79 + t * 3.74 + ph) + sin(p.y * 12.48 - t * 3.30 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.62 + time * 0.27, vec3(0.50, 0.43, 0.59), vec3(0.47, 0.35, 0.44), vec3(0.74, 0.75, 0.95), vec3(0.74, 0.21, 0.04));
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
