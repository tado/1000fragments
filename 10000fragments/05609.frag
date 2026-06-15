uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(-0.39 + 0.3 * sin(t * 1.16 + ph), -0.39 + 0.3 * cos(t * 1.16 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	{ p = vec2(atan(p.y, p.x) * 1.95, length(p) * 5.87 - time * 0.80); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.22, vec3(0.49, 0.47, 0.51), vec3(0.38, 0.33, 0.35), vec3(1.01, 0.83, 1.20), vec3(0.01, 0.74, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
