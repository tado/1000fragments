uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(-0.46 + 0.3 * sin(t * 1.25 + ph), 0.35 + 0.3 * cos(t * 1.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p *= 2.93;
	{ p = vec2(atan(p.y, p.x) * 1.61, length(p) * 4.26 - time * 0.38); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(0.42) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.47 + time * 0.01);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
