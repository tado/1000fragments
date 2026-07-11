uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 0.92 + ph), -0.02 + 0.3 * cos(t * 1.59 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.33 / 3.1415927, 1.12 / r - time * 2.12);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.95, 0.96, 0.95) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.23, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
