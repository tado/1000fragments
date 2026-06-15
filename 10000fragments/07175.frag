uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.15 + t * 1.74 + ph) + sin(p.y * 16.97 - t * 5.22 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(-0.05 + 0.3 * sin(t * 0.76 + ph), 0.05 + 0.3 * cos(t * 0.76 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.13 + time * 0.63) * p;
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 4.97 - time * 0.45); }
	p = fract(p * 1.35) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.67 + time * 0.14, vec3(0.55, 0.54, 0.47), vec3(0.41, 0.39, 0.40), vec3(0.77, 1.19, 1.28), vec3(0.02, 0.20, 0.73));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
