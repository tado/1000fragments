uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.28) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 3.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.52 + 0.3 * sin(t * 1.03 + ph), 0.69 + 0.3 * cos(t * 1.03 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.43;
	p = fract(p * 1.31) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.24; p = rot2(2.09) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.18, vec3(0.55, 0.54, 0.45), vec3(0.39, 0.46, 0.48), vec3(1.21, 1.32, 1.31), vec3(0.01, 0.66, 0.38));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
