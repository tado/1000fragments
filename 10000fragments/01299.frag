uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(0.34 + 0.3 * sin(t * 1.55 + ph), 0.64 + 0.3 * cos(t * 0.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.60 / 3.1415927, 1.31 / r + time * 2.34);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.84 + time * 0.12);
	col *= clamp(r * 1.33, 0.0, 1.0);
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.07 + time * 5.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
