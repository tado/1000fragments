uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.22; vec2 jc = vec2(-0.44 + 0.3 * sin(t * 0.97 + ph), 0.27 + 0.3 * cos(t * 0.97 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p = rot2(p.y * 1.61 + time * 0.14) * p;
	p = rot2(length(p) * 2.75 + time * 1.00) * p;
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 4.27 - time * 0.56); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.17, 0.36), vec3(0.58, 0.66, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
