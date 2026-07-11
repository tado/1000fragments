uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.09 + 0.3 * sin(t * 1.48 + ph), 0.71 + 0.3 * cos(t * 1.48 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(0.54) * p; }
	p += vec2(0.69, -0.53) * sin(length(p) * 5.58 - time * 1.39) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.35));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
