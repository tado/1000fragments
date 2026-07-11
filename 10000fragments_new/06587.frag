uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.58; vec2 jc = vec2(0.25 + 0.3 * sin(t * 1.49 + ph), -0.60 + 0.3 * cos(t * 0.93 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.08 / 3.1415927, 1.35 / r + time * 2.53);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.37, 0.48, 0.75) * (0.19 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 1.94, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.96 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
