uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 1.25 + ph), -0.06 + 0.3 * cos(t * 0.50 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.23 + time * 1.00) * p;
	p.y += sin(p.x * 4.94 + time * 2.16) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.12, vec3(0.50, 0.44, 0.48), vec3(0.47, 0.48, 0.35), vec3(0.80, 0.96, 1.34), vec3(0.23, 0.55, 0.58));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
