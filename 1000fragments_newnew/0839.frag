uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.33; vec2 jc = vec2(0.12 + 0.3 * sin(t * 1.58 + ph), -0.02 + 0.3 * cos(t * 0.95 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.62) * 0.49), cos((time * 0.62) * 0.42)) * 0.11;
	float an = atan(p.y, p.x) + (time * 0.62) * -0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.46 / 3.1415927, 1.42 / r - (time * 0.62) * 0.62);
	float d = field(tv, (time * 0.62), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.16, 0.16), vec3(0.55, 0.68, 0.67), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.46, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.032, 0.972, 0.942) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
