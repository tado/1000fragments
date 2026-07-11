uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 1.16 + ph), 0.28 + 0.3 * cos(t * 0.92 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.20), cos(time * 1.15)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.21 / 3.1415927, 1.00 / r + time * 0.76);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.32, 0.05), vec3(0.69, 0.70, 0.76), cc);
	col *= clamp(r * 2.70, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
