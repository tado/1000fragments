uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 11.60 - t * 2.93 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 21.54 - t * 6.60 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 0.88 + ph), -0.58 + 0.3 * cos(t * 1.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(1.27) * p; }
	p = rot2(p.y * 2.27 + time * 0.93) * p;
	p = fract(p * 2.46) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.51 + time * 0.07, vec3(0.50, 0.42, 0.60), vec3(0.45, 0.34, 0.39), vec3(1.05, 1.07, 0.79), vec3(0.79, 0.52, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
