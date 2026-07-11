uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.82 * sin(mf + 3.0) + ph), cos(t * 0.82 * cos(mf + 3.0) + ph));
        ms += 0.027 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.26; vec2 jc = vec2(-0.13 + 0.3 * sin(t * 0.25 + ph), 0.48 + 0.3 * cos(t * 0.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	p += vec2(-0.69, -0.86) * sin(length(p) * 2.32 - time * 1.97) * 0.24;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = d1 + d2;
	vec3 col = palette(d * 0.81 + time * 0.14, vec3(0.42, 0.59, 0.54), vec3(0.41, 0.32, 0.30), vec3(0.95, 1.35, 0.97), vec3(0.60, 0.80, 0.57));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
