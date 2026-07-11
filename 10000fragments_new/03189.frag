uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(0.13 + 0.3 * sin(t * 0.82 + ph), 0.59 + 0.3 * cos(t * 0.57 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.39 + t * 4.66 + ph) + sin(p.y * 4.85 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.61;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.28 + time * 0.13, vec3(0.46, 0.48, 0.45), vec3(0.44, 0.40, 0.34), vec3(0.74, 1.18, 1.20), vec3(0.61, 0.16, 0.67));
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
