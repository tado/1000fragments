uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(0.24 + 0.3 * sin(t * 1.44 + ph), -0.69 + 0.3 * cos(t * 1.58 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.49 / 3.1415927, 1.24 / r + time * 2.96);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.30, vec3(0.50, 0.59, 0.48), vec3(0.40, 0.50, 0.33), vec3(1.01, 1.39, 0.86), vec3(0.14, 0.41, 0.13));
	col *= clamp(r * 2.95, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
