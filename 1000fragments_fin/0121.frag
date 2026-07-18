uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(0.36 + 0.3 * sin(t * 1.77 + ph), 0.21 + 0.3 * cos(t * 1.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.61;
	p = fract(p * 1.17) - 0.5;
	p = rot2(p.y * 2.55 + (time * 0.74) * 0.88) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.46; }
	p = rot2(length(p) * 3.22 + (time * 0.74) * 0.59) * p;
	float d = field(p, (time * 0.74), 0.0);
	vec3 col = palette(d * 1.31 + (time * 0.74) * 0.08, vec3(0.16, 0.31, 0.45), vec3(0.15, 0.24, 0.30), vec3(0.95, 0.98, 0.97), vec3(0.53, 0.43, 0.34));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.963, 1.023, 0.937);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
