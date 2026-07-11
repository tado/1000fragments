uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.75; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.04 + ph), 0.76 + 0.3 * cos(t * 1.04 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.91 * sin(mf + 3.0) + ph), cos(t * 0.91 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.44) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.35, length(p) * 3.32 - time * 0.45); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = d1 * d2;
	vec3 col = palette(d * 1.08 + time * 0.02, vec3(0.48, 0.55, 0.40), vec3(0.33, 0.46, 0.31), vec3(1.06, 0.80, 0.84), vec3(0.03, 0.66, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
