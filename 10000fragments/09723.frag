uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.72; vec2 jc = vec2(-0.79 + 0.3 * sin(t * 1.32 + ph), 0.71 + 0.3 * cos(t * 1.32 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.38 * p.y + time * 1.71); p.y += 0.42 / wf * cos(wf * 1.94 * p.x + time * 1.24); }
	p += vec2(0.12, 0.24) * sin(length(p) * 2.56 - time * 1.55) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.26, vec3(0.40, 0.46, 0.54), vec3(0.47, 0.41, 0.34), vec3(0.72, 1.02, 0.97), vec3(0.42, 0.33, 0.94));
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
