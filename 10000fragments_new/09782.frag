uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.72; vec2 jc = vec2(0.22 + 0.3 * sin(t * 0.79 + ph), -0.03 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 0.57)) * 0.15;
	float an = atan(p.y, p.x) + time * 0.27;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.65 / 3.1415927, 1.28 / r + time * 2.09);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.99, 0.83) + vec3(0.20, 0.03, 0.09);
	col *= clamp(r * 1.01, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
