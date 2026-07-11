uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.37; vec2 jc = vec2(-0.05 + 0.3 * sin(t * 1.36 + ph), 0.26 + 0.3 * cos(t * 0.81 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.68) * p * 18.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.73 + time * 0.15, vec3(0.46, 0.44, 0.45), vec3(0.41, 0.44, 0.31), vec3(0.81, 1.15, 1.15), vec3(0.76, 0.65, 0.06)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
