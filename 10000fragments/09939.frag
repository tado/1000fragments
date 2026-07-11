uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.65; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.04 + ph), 0.26 + 0.3 * cos(t * 1.04 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.30 + t * 1.74 + ph) + sin(p.y * 4.14 - t * 1.74 + ph)
        + sin((p.x + p.y) * 6.17 + t * 1.74 + ph) + sin(length(p) * 14.66 - t * 1.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.56 + time * 0.06, vec3(0.51, 0.57, 0.54), vec3(0.39, 0.41, 0.49), vec3(1.08, 1.26, 0.99), vec3(0.69, 0.28, 0.02));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
