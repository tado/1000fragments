uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.90; vec2 jc = vec2(-0.35 + 0.3 * sin(t * 0.43 + ph), 0.04 + 0.3 * cos(t * 0.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.39 + t * 2.02 + ph) + sin(p.y * 13.86 - t * 2.02 + ph)
        + sin((p.x + p.y) * 9.86 + t * 2.02 + ph) + sin(length(p) * 8.39 - t * 2.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.20, vec3(0.44, 0.41, 0.46), vec3(0.30, 0.32, 0.43), vec3(1.36, 0.81, 0.83), vec3(0.45, 0.56, 0.70));
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
