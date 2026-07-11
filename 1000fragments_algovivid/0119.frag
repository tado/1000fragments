uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.04; vec2 jc = vec2(-0.53 + 0.3 * sin(t * 0.42 + ph), 0.30 + 0.3 * cos(t * 1.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.00 + t * 1.13) - 0.5) * 2.0;
    v = sin((p.y * 6.86 + zx * 1.34 + t * 1.64) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	float d1 = field(p, (time * 0.53), 0.0);
	float d2 = field2(p, (time * 0.53), 0.89);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + (time * 0.53) * 0.23, vec3(0.33, 0.31, 0.24), vec3(0.23, 0.22, 0.17), vec3(0.82, 0.70, 0.48), vec3(0.17, 0.68, 0.63));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.982, 1.017) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
