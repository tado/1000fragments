uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.55; vec2 jc = vec2(-0.14 + 0.3 * sin(t * 0.31 + ph), -0.09 + 0.3 * cos(t * 0.64 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.58) * 0.51), cos((time * 0.58) * 0.80)) * 0.27;
	float an = atan(p.y, p.x) + (time * 0.58) * -0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.33 / 3.1415927, 1.25 / r + (time * 0.58) * 1.91);
	float d = field(tv, (time * 0.58), 0.0);
	vec3 col = vec3(0.51, 0.45, 0.39) * (0.09 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.88, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.998, 1.013) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
