uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(-0.20 + 0.3 * sin(t * 1.24 + ph), -0.77 + 0.3 * cos(t * 1.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.55 + time * 0.45) * p;
	p = rot2(p.y * -1.28 + time * 0.93) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.23 * p.y + time * 0.77); p.y += 0.35 / wf * cos(wf * 3.61 * p.x + time * 1.66); }
	p = abs(p) - 0.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.15, vec3(0.52, 0.46, 0.46), vec3(0.45, 0.48, 0.45), vec3(1.08, 1.21, 0.81), vec3(0.09, 0.32, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
