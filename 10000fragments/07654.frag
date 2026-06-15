uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.88; vec2 jc = vec2(-0.74 + 0.3 * sin(t * 0.34 + ph), -0.37 + 0.3 * cos(t * 0.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 5.00 - time * 0.24); }
	p *= 2.53;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.87 * p.y + time * 1.44); p.y += 0.23 / wf * cos(wf * 1.93 * p.x + time * 0.71); }
	p = fract(p * 2.34) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.01, vec3(0.58, 0.58, 0.49), vec3(0.49, 0.42, 0.39), vec3(1.18, 1.08, 1.08), vec3(0.66, 0.80, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
