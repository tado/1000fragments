uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.76; vec2 jc = vec2(-0.57 + 0.3 * sin(t * 1.15 + ph), -0.51 + 0.3 * cos(t * 1.15 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = rot2(length(p) * -1.72 + time * 0.30) * p;
	p = rot2(0.39) * p;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
