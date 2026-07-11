uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(-0.34 + 0.3 * sin(t * 0.37 + ph), -0.68 + 0.3 * cos(t * 0.37 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.35 + time * 0.94) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.41; p = rot2(0.65) * p; }
	p *= 2.42;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.33, 0.14), vec3(0.69, 0.83, 0.92), d);
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
