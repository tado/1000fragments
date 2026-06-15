uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.37 * sin(mf + 3.0) + ph), cos(t * 0.37 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.68; vec2 jc = vec2(0.29 + 0.3 * sin(t * 0.29 + ph), -0.51 + 0.3 * cos(t * 0.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.61) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(2.38) * p; }
	p = rot2(time * 0.96) * p;
	p += vec2(-0.51, -0.86) * sin(length(p) * 2.92 - time * 0.67) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.88 + time * 0.24, vec3(0.50, 0.58, 0.60), vec3(0.32, 0.34, 0.46), vec3(0.89, 0.77, 1.01), vec3(0.12, 0.19, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
