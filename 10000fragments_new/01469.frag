uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(0.07 + 0.3 * sin(t * 1.34 + ph), -0.43 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(0.99) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.01, vec3(0.49, 0.52, 0.58), vec3(0.44, 0.37, 0.48), vec3(0.86, 0.86, 0.73), vec3(0.91, 0.23, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
