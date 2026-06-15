uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(0.32 + 0.3 * sin(t * 0.65 + ph), 0.54 + 0.3 * cos(t * 0.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.31; p = rot2(1.40) * p; }
	p = abs(p);
	p = rot2(2.23) * p;
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 2.86 - time * 0.10); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.54));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
