uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(-0.68 + 0.3 * sin(t * 0.87 + ph), -0.69 + 0.3 * cos(t * 0.58 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.92 / 3.1415927, 0.42 / r + time * 0.82);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.04, vec3(0.42, 0.46, 0.55), vec3(0.40, 0.45, 0.42), vec3(0.74, 1.13, 0.84), vec3(0.30, 0.68, 0.15));
	col *= clamp(r * 1.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
