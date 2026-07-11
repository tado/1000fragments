uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.59 + t * 0.93 + ph) + sin(p.y * 3.43 - t * 3.25 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(0.36 + 0.3 * sin(t * 0.25 + ph), 0.36 + 0.3 * cos(t * 0.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.14 + time * 0.32) * p;
	p += vec2(-0.54, -0.42) * sin(length(p) * 2.62 - time * 1.90) * 0.19;
	p = fract(p * 2.27) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.29, vec3(0.49, 0.53, 0.60), vec3(0.38, 0.35, 0.38), vec3(1.24, 1.34, 1.35), vec3(0.48, 0.55, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
