uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.12 + sin(p.y * 4.80 + t * 4.00) * 3.42 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.27; vec2 jc = vec2(0.19 + 0.3 * sin(t * 1.04 + ph), 0.46 + 0.3 * cos(t * 1.04 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.69, -0.61) * sin(length(p) * 3.45 - time * 0.63) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.36);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.17, vec3(0.41, 0.57, 0.51), vec3(0.32, 0.45, 0.39), vec3(1.07, 0.93, 0.85), vec3(0.57, 0.08, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
