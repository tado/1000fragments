uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(-0.16 + 0.3 * sin(t * 1.77 + ph), 0.10 + 0.3 * cos(t * 0.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.23) * p * 20.09;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.45 + time * 0.24, vec3(0.52, 0.55, 0.54), vec3(0.47, 0.39, 0.46), vec3(0.83, 0.89, 1.01), vec3(0.86, 0.05, 0.99)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.63 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
