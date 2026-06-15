uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.63 + t * 3.28 + ph) + sin(p.y * 10.80 - t * 3.28 + ph)
        + sin((p.x + p.y) * 4.20 + t * 3.28 + ph) + sin(length(p) * 11.91 - t * 3.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 1.10 + ph), 0.45 + 0.3 * cos(t * 1.10 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.55 + time * 0.41) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = d1 * d2;
	vec3 col = palette(d * 1.47 + time * 0.03, vec3(0.55, 0.48, 0.50), vec3(0.41, 0.32, 0.38), vec3(1.23, 1.05, 1.34), vec3(0.22, 0.56, 0.81));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
