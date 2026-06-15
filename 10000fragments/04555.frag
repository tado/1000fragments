uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(-0.18 + 0.3 * sin(t * 1.33 + ph), -0.00 + 0.3 * cos(t * 1.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	p = rot2(length(p) * -3.70 + time * 0.37) * p;
	p = rot2(p.y * -1.08 + time * 0.45) * p;
	p *= 1.76;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.07, vec3(0.54, 0.49, 0.49), vec3(0.34, 0.31, 0.42), vec3(0.92, 1.11, 1.13), vec3(0.76, 0.95, 0.92));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
