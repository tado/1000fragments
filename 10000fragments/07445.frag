uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.42 + sin(p.y * 1.52 + t * 5.04) * 1.20 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.45; vec2 jc = vec2(-0.48 + 0.3 * sin(t * 0.93 + ph), 0.06 + 0.3 * cos(t * 0.93 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.67, -0.69) * sin(length(p) * 5.85 - time * 1.40) * 0.27;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.34 * p.y + time * 1.50); p.y += 0.41 / wf * cos(wf * 1.64 * p.x + time * 1.79); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.00, vec3(0.54, 0.48, 0.53), vec3(0.39, 0.36, 0.40), vec3(1.11, 0.89, 1.33), vec3(0.37, 0.38, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
