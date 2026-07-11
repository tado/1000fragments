uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(0.03 + 0.3 * sin(t * 0.77 + ph), 0.06 + 0.3 * cos(t * 0.77 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.99) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 1.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.27 * p.y + time * 1.41); p.y += 0.36 / wf * cos(wf * 1.87 * p.x + time * 1.09); }
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.88 + time * 0.06, vec3(0.46, 0.57, 0.48), vec3(0.35, 0.37, 0.32), vec3(1.14, 1.39, 1.25), vec3(0.65, 0.70, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
