uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.14 + vec2(t * 0.42, -t * 0.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.38; vec2 jc = vec2(-0.27 + 0.3 * sin(t * 0.31 + ph), 0.21 + 0.3 * cos(t * 0.31 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.06) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + time * 0.15, vec3(0.49, 0.57, 0.59), vec3(0.32, 0.45, 0.38), vec3(0.82, 1.20, 1.39), vec3(0.31, 0.77, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
