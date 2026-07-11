uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(0.26 + 0.3 * sin(t * 0.59 + ph), -0.04 + 0.3 * cos(t * 1.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.35) * p * 18.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = mix(vec3(0.08, 0.08, 0.11), vec3(0.81, 0.72, 0.89), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.13 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
