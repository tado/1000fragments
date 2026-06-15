uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.70; vec2 jc = vec2(0.40 + 0.3 * sin(t * 1.23 + ph), -0.74 + 0.3 * cos(t * 1.23 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.70 + t * 4.16 + ph) + sin(p.y * 3.32 - t * 2.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = rot2(2.02) * p;
	p = abs(p) - 0.66;
	p = fract(p * 2.52) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = d1 * d2;
	vec3 col = palette(d * 1.52 + time * 0.09, vec3(0.42, 0.47, 0.48), vec3(0.37, 0.36, 0.41), vec3(0.87, 0.87, 0.95), vec3(0.66, 0.51, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
