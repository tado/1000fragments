uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.55; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 1.47 + ph), 0.48 + 0.3 * cos(t * 1.47 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 3.75 - time * 0.61); }
	p = rot2(1.69) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.04, 0.54), vec3(0.83, 0.77, 0.49), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
