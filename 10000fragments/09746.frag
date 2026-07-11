uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.79 + 0.3 * sin(t * 0.74 + ph), 0.47 + 0.3 * cos(t * 0.74 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 4.05 - time * 0.38); }
	p = rot2(p.y * -3.17 + time * 0.36) * p;
	p = rot2(1.93) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.44, 0.56), vec3(0.62, 0.93, 0.96), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
