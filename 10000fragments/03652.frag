uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.45; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 1.17 + ph), 0.53 + 0.3 * cos(t * 1.17 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	p = rot2(length(p) * -3.37 + time * 0.29) * p;
	p += vec2(0.97, -0.23) * sin(length(p) * 3.00 - time * 0.55) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.10, vec3(0.44, 0.41, 0.53), vec3(0.47, 0.32, 0.33), vec3(1.14, 1.10, 0.76), vec3(0.81, 0.56, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
