uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(0.20 + 0.3 * sin(t * 0.47 + ph), -0.31 + 0.3 * cos(t * 0.67 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.71 / 3.1415927, 1.04 / r + time * 2.42);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.07, vec3(0.47, 0.40, 0.41), vec3(0.43, 0.37, 0.47), vec3(0.83, 1.31, 0.89), vec3(0.17, 0.33, 0.90));
	col *= clamp(r * 1.52, 0.0, 1.0);
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
