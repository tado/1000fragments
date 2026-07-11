uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(0.27 + 0.3 * sin(t * 0.61 + ph), 0.47 + 0.3 * cos(t * 0.61 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.27;
	p += vec2(0.96, 0.92) * sin(length(p) * 5.27 - time * 0.58) * 0.30;
	p = fract(p * 1.45) - 0.5;
	p = rot2(length(p) * 3.59 + time * 0.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
