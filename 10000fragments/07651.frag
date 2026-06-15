uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.30) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 0.75 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.17; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 1.34 + ph), -0.75 + 0.3 * cos(t * 1.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.36; p = rot2(1.05) * p; }
	p = rot2(time * 1.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.08, vec3(0.43, 0.56, 0.50), vec3(0.35, 0.42, 0.43), vec3(1.17, 1.24, 0.85), vec3(0.46, 0.59, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
