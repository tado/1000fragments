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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.93 * sin(mf + 3.0) + ph), cos(t * 1.93 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.48 + 0.3 * sin(t * 0.42 + ph), 0.20 + 0.3 * cos(t * 0.42 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 3.47;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(1.21) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.01, vec3(0.41, 0.54, 0.52), vec3(0.39, 0.47, 0.44), vec3(1.26, 0.77, 0.87), vec3(0.23, 0.91, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
