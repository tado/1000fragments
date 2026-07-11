uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 1.19 + ph), -0.30 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p = abs(p) - 0.70;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.08, vec3(0.55, 0.50, 0.54), vec3(0.38, 0.49, 0.36), vec3(1.37, 1.39, 1.10), vec3(0.40, 0.57, 0.09));
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
