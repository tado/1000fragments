uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.99; vec2 jc = vec2(0.37 + 0.3 * sin(t * 1.56 + ph), -0.27 + 0.3 * cos(t * 1.00 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(1.09) * p; }
	p = rot2(1.53) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
