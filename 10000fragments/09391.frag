uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(-0.09 + 0.3 * sin(t * 1.19 + ph), -0.01 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(38) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.87 + jf * 4.0), cos(t * 0.30 * jf)) * 0.31;
        xs += sin(length(p - im) * 115.03 - t * 4.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.02) * p;
	p = rot2(p.y * -2.68 + time * 0.63) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.97);
	float d = d1 + d2;
	vec3 col = palette(d * 0.50 + time * 0.17, vec3(0.55, 0.41, 0.53), vec3(0.42, 0.36, 0.44), vec3(1.09, 1.40, 0.78), vec3(0.78, 0.48, 0.14));
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
