uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.53; vec2 jc = vec2(-0.03 + 0.3 * sin(t * 0.51 + ph), 0.11 + 0.3 * cos(t * 0.51 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.31; vec2 jc = vec2(0.08 + 0.3 * sin(t * 0.34 + ph), 0.06 + 0.3 * cos(t * 0.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = d1 + d2;
	vec3 col = palette(d * 1.01 + time * 0.07, vec3(0.47, 0.54, 0.48), vec3(0.34, 0.37, 0.42), vec3(1.19, 0.94, 1.12), vec3(0.18, 0.37, 0.61));
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
