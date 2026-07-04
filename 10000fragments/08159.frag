uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.67 + 0.3 * sin(t * 1.25 + ph), -0.79 + 0.3 * cos(t * 0.89 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.99 / 3.1415927, 0.39 / r + time * 0.95);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.13, 0.21), vec3(0.96, 0.58, 0.99), cc);
	col *= clamp(r * 2.01, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
