uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.71 * sin(mf + 3.0) + ph), cos(t * 1.71 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.98; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 0.48 + ph), 0.28 + 0.3 * cos(t * 0.48 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.25) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.12, vec3(0.43, 0.42, 0.42), vec3(0.38, 0.50, 0.39), vec3(0.71, 0.82, 1.18), vec3(0.12, 0.52, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
