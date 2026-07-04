uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.57; vec2 jc = vec2(-0.33 + 0.3 * sin(t * 1.34 + ph), 0.19 + 0.3 * cos(t * 1.70 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.53) * p * 8.08;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.59 + time * 0.24, vec3(0.59, 0.48, 0.50), vec3(0.50, 0.41, 0.31), vec3(1.24, 1.06, 1.02), vec3(0.50, 0.64, 0.49)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
