uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(-0.37 + 0.3 * sin(t * 1.14 + ph), 0.22 + 0.3 * cos(t * 1.59 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.45 / 3.1415927, 1.47 / r + time * 1.50);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.73, 0.84, 0.82) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
