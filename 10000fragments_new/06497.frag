uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.41 + ph), -0.51 + 0.3 * cos(t * 1.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.48 + time * 0.89) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.44; p = rot2(0.52) * p; }
	p += vec2(0.14, -0.54) * sin(length(p) * 5.44 - time * 2.37) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
