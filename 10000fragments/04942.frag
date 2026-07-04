uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.09; vec2 jc = vec2(0.25 + 0.3 * sin(t * 0.45 + ph), 0.14 + 0.3 * cos(t * 0.90 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.84), cos(time * 0.97)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.33 / 3.1415927, 0.36 / r + time * 1.00);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.05, 0.49), vec3(0.63, 0.63, 0.59), cc);
	col *= clamp(r * 1.55, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
