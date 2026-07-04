uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.90; vec2 jc = vec2(0.25 + 0.3 * sin(t * 1.25 + ph), 0.33 + 0.3 * cos(t * 0.67 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.04 + t * 3.69 + ph) * 0.7;
    float wb = sin(p.y * 15.82 - t * 3.65 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.19));
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.51; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.72 + time * 0.26, vec3(0.47, 0.50, 0.51), vec3(0.46, 0.42, 0.43), vec3(1.23, 1.24, 0.75), vec3(0.10, 0.42, 0.76));
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
