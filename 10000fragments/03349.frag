uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.24 + t * 2.85 + ph) + sin(p.y * 6.07 - t * 2.85 + ph)
        + sin((p.x + p.y) * 3.91 + t * 2.85 + ph) + sin(length(p) * 14.16 - t * 2.85 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(0.37 + 0.3 * sin(t * 0.43 + ph), 0.71 + 0.3 * cos(t * 0.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = d1 * d2;
	vec3 col = palette(d * 0.77 + time * 0.23, vec3(0.45, 0.51, 0.41), vec3(0.49, 0.43, 0.34), vec3(0.88, 1.14, 0.88), vec3(0.85, 0.39, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
