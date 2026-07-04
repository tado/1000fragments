uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.72; vec2 jc = vec2(-0.45 + 0.3 * sin(t * 1.48 + ph), 0.31 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.18) * p * 21.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 0.98 + time * 0.15, vec3(0.56, 0.46, 0.47), vec3(0.43, 0.35, 0.48), vec3(0.85, 1.32, 1.07), vec3(0.74, 0.98, 0.19)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
