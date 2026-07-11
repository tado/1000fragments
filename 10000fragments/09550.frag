uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.57; vec2 jc = vec2(-0.04 + 0.3 * sin(t * 1.21 + ph), 0.25 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.02; vec2 jc = vec2(-0.28 + 0.3 * sin(t * 0.57 + ph), 0.23 + 0.3 * cos(t * 0.57 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.58 * p.y + time * 1.18); p.y += 0.48 / wf * cos(wf * 3.26 * p.x + time * 1.53); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.74 + time * 0.28, vec3(0.51, 0.55, 0.47), vec3(0.48, 0.46, 0.36), vec3(1.36, 1.30, 0.97), vec3(0.66, 0.58, 0.74));
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
