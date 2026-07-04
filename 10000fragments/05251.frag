uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.02; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 0.53 + ph), -0.42 + 0.3 * cos(t * 0.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.44 + jf * 4.0), cos(t * 0.37 * jf)) * 0.79;
        xs += sin(length(p - im) * 163.27 - t * 11.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	p += vec2(0.42, -0.93) * sin(length(p) * 5.98 - time * 2.19) * 0.35;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.66 * p.y + time * 2.01); p.y += 0.29 / wf * cos(wf * 2.58 * p.x + time * 1.08); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.32);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.19 + time * 0.14, vec3(0.41, 0.58, 0.49), vec3(0.48, 0.39, 0.30), vec3(1.16, 1.26, 1.20), vec3(0.15, 0.85, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
