uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(0.37 + 0.3 * sin(t * 1.65 + ph), -0.65 + 0.3 * cos(t * 1.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.38 / 3.1415927, 0.30 / r + time * 2.43);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.40, 0.10, 0.37), vec3(0.72, 0.56, 0.87), cc);
	col *= clamp(r * 2.00, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
