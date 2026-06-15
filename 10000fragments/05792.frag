uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.04; vec2 jc = vec2(0.12 + 0.3 * sin(t * 0.22 + ph), 0.63 + 0.3 * cos(t * 0.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.88 * sin(mf + 3.0) + ph), cos(t * 0.88 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	p += vec2(-0.17, -0.71) * sin(length(p) * 2.73 - time * 1.87) * 0.27;
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.05, vec3(0.48, 0.47, 0.57), vec3(0.50, 0.44, 0.46), vec3(1.19, 1.09, 1.06), vec3(0.87, 0.32, 0.89));
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
