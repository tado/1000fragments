uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(0.34 + 0.3 * sin(t * 1.68 + ph), 0.28 + 0.3 * cos(t * 0.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.83)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.01 / 3.1415927, 0.34 / r + time * 2.10);
	tv.x += tv.y * 0.37;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.04, vec3(0.55, 0.42, 0.52), vec3(0.44, 0.46, 0.32), vec3(0.96, 0.80, 1.03), vec3(0.62, 0.13, 0.16));
	col *= clamp(r * 1.26, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
