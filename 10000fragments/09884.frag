uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.27; vec2 jc = vec2(-0.29 + 0.3 * sin(t * 1.04 + ph), 0.29 + 0.3 * cos(t * 1.04 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	{ p = vec2(atan(p.y, p.x) * 2.24, length(p) * 5.19 - time * 0.67); }
	p = rot2(time * -1.34) * p;
	p = rot2(p.y * 1.42 + time * 0.50) * p;
	p = rot2(2.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.16, vec3(0.43, 0.58, 0.47), vec3(0.48, 0.47, 0.39), vec3(0.82, 1.16, 0.99), vec3(0.66, 0.08, 0.34));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
