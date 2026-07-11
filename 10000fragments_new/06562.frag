uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.24 + 0.32 * sin(t * 0.97)) + vec2(-0.49, 0.16) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.33; vec2 jc = vec2(0.31 + 0.3 * sin(t * 1.18 + ph), 0.11 + 0.3 * cos(t * 0.91 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.16, vec3(0.57, 0.50, 0.44), vec3(0.33, 0.49, 0.38), vec3(1.23, 0.90, 0.93), vec3(0.03, 0.62, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
