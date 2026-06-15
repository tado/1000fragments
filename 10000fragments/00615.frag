uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.60; vec2 jc = vec2(-0.47 + 0.3 * sin(t * 0.27 + ph), -0.59 + 0.3 * cos(t * 0.27 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.99 + time * 0.80) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.60; p = rot2(1.72) * p; }
	p = abs(p);
	p = fract(p * 2.31) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.25, vec3(0.47, 0.51, 0.50), vec3(0.45, 0.41, 0.50), vec3(0.87, 0.92, 0.81), vec3(0.24, 0.20, 0.01));
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
