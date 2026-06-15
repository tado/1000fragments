uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.91) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 3.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(-0.34 + 0.3 * sin(t * 0.26 + ph), -0.39 + 0.3 * cos(t * 0.26 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.43; p = rot2(1.71) * p; }
	p = rot2(length(p) * -2.59 + time * 0.53) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.06);
	float d = d1 * d2;
	vec3 col = palette(d * 0.83 + time * 0.15, vec3(0.59, 0.59, 0.55), vec3(0.34, 0.42, 0.32), vec3(0.80, 0.81, 1.39), vec3(0.79, 0.51, 0.46));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
