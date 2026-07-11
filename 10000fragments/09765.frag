uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.48; vec2 jc = vec2(-0.35 + 0.3 * sin(t * 1.45 + ph), 0.43 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	p = rot2(2.84) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.47 * p.y + time * 1.81); p.y += 0.22 / wf * cos(wf * 3.17 * p.x + time * 1.19); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.22, vec3(0.60, 0.46, 0.41), vec3(0.49, 0.40, 0.44), vec3(1.09, 0.94, 1.11), vec3(0.15, 0.54, 0.42));
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
