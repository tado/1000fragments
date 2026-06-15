uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.45 - t * 5.34 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(0.11 + 0.3 * sin(t * 0.21 + ph), -0.76 + 0.3 * cos(t * 0.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.63;
	p = rot2(length(p) * -1.46 + time * 1.07) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.28, vec3(0.51, 0.46, 0.42), vec3(0.46, 0.47, 0.41), vec3(1.10, 0.73, 1.02), vec3(0.01, 0.63, 0.28));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
