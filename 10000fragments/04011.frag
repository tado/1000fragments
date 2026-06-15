uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.53) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 1.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.25 + 0.3 * sin(t * 1.22 + ph), 0.06 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(1.16) * p; }
	p = abs(p) - 0.78;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = d1 + d2;
	vec3 col = palette(d * 0.83 + time * 0.17, vec3(0.57, 0.43, 0.57), vec3(0.35, 0.42, 0.49), vec3(0.97, 1.29, 1.24), vec3(0.28, 0.26, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
