uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.91 * sin(mf + 3.0) + ph), cos(t * 0.91 * cos(mf + 3.0) + ph));
        ms += 0.074 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(0.14 + 0.3 * sin(t * 1.14 + ph), 0.03 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.32, -0.09) * sin(length(p) * 4.58 - time * 1.47) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.67 + time * 0.10, vec3(0.54, 0.41, 0.43), vec3(0.40, 0.35, 0.37), vec3(0.83, 0.98, 0.83), vec3(0.14, 0.31, 0.04));
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
