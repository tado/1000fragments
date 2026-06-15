uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.36) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.41 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.02; vec2 jc = vec2(-0.34 + 0.3 * sin(t * 0.26 + ph), -0.29 + 0.3 * cos(t * 0.26 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	p = rot2(2.25) * p;
	p = fract(p * 2.13) - 0.5;
	p += vec2(-0.63, -0.48) * sin(length(p) * 3.84 - time * 1.20) * 0.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.09 + time * 0.26, vec3(0.52, 0.49, 0.45), vec3(0.46, 0.41, 0.38), vec3(1.33, 1.08, 1.23), vec3(0.89, 0.84, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
