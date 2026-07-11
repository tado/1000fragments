uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(0.27 + 0.3 * sin(t * 0.68 + ph), 0.68 + 0.3 * cos(t * 1.23 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 1.10 / r - (time * 0.76) * 1.81);
	float d = field(tv, (time * 0.76), 0.0);
	vec3 col = palette((d) * 0.90 + (time * 0.76) * 0.00, vec3(0.29, 0.31, 0.31), vec3(0.24, 0.21, 0.21), vec3(0.48, 0.66, 0.53), vec3(0.55, 0.87, 0.50));
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.933, 0.988, 1.027) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
