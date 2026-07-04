uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(-0.66 + 0.3 * sin(t * 1.51 + ph), -0.13 + 0.3 * cos(t * 1.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 35.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 0.75 / r - time * 1.91);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 1.19, 0.73) + vec3(0.23, 0.21, 0.11);
	col *= clamp(r * 2.72, 0.0, 1.0);
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
