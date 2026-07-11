uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.17 * cos(sa * 7 + t * 1.98 + ph);
    v = sin((sr - petal) * 14.75);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.47; vec2 jc = vec2(-0.30 + 0.3 * sin(t * 1.13 + ph), 0.15 + 0.3 * cos(t * 1.13 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	p += vec2(0.22, -0.82) * sin(length(p) * 5.56 - time * 1.87) * 0.28;
	p *= 1.74;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.58 + time * 0.08, vec3(0.46, 0.49, 0.53), vec3(0.44, 0.31, 0.38), vec3(1.05, 1.13, 1.26), vec3(0.13, 0.35, 0.98));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
