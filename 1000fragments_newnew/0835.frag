uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.47; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 1.22 + ph), 0.13 + 0.3 * cos(t * 0.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 5.29 - (time * 0.80) * 0.29); }
	float d = field(p, (time * 0.80), 0.0);
	vec3 col = palette(d * 0.57 + (time * 0.80) * 0.13, vec3(0.27, 0.21, 0.26), vec3(0.20, 0.19, 0.19), vec3(0.69, 0.41, 0.77), vec3(0.40, 0.88, 0.97));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 1.008, 0.933) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
