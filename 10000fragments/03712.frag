uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(0.05 + 0.3 * sin(t * 0.97 + ph), 0.04 + 0.3 * cos(t * 1.73 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.89) * p * 12.48;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.97, 0.98, 0.65), vec3(0.02, 0.00, 0.19), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
