uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.19; vec2 jc = vec2(-0.04 + 0.3 * sin(t * 1.63 + ph), -0.53 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.x += p.y * 0.58;
	float an = atan(p.y, p.x) + (time * 0.56) * -0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 0.83 / r + (time * 0.56) * 2.63);
	float d = field(tv, (time * 0.56), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.040, 0.080, 0.042), vec3(0.385, 0.468, 0.178), smoothstep(0.0, 0.53, cc)), vec3(1.000, 0.890, 0.558), smoothstep(0.53, 1.0, cc));
	col *= clamp(r * 1.67, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.56 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.950, 0.980, 1.056);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
