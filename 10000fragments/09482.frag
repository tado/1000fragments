uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.31; vec2 jc = vec2(-0.74 + 0.3 * sin(t * 1.46 + ph), -0.31 + 0.3 * cos(t * 1.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.08, 0.40) * sin(length(p) * 4.09 - time * 1.84) * 0.12;
	p = rot2(1.93) * p;
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 5.78 - time * 0.41); }
	p *= 1.77;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.16, 0.53), vec3(0.96, 0.74, 0.80), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
