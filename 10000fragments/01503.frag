uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.57 + t * 4.59 + ph) + sin(p.y * 13.29 - t * 4.59 + ph)
        + sin((p.x + p.y) * 8.35 + t * 4.59 + ph) + sin(length(p) * 9.39 - t * 4.59 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.46; vec2 jc = vec2(-0.11 + 0.3 * sin(t * 1.22 + ph), 0.77 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = d1 * d2;
	vec3 col = palette(d * 0.60 + time * 0.13, vec3(0.53, 0.47, 0.56), vec3(0.35, 0.46, 0.41), vec3(0.74, 1.07, 1.33), vec3(0.21, 0.95, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
