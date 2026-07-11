uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(-0.17 + 0.3 * sin(t * 1.74 + ph), -0.45 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.79 / 3.1415927, 1.30 / r - time * 1.23);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.06, vec3(0.49, 0.59, 0.55), vec3(0.39, 0.48, 0.36), vec3(0.90, 1.10, 1.19), vec3(0.07, 0.38, 0.36));
	col *= clamp(r * 2.12, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
