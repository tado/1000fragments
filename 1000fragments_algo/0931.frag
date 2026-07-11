uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.12; vec2 jc = vec2(-0.19 + 0.3 * sin(t * 1.03 + ph), 0.22 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 0.96 / r - (time * 0.56) * 1.05);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = vec3(0.60, 0.59, 0.72) * (0.10 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.96, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.943, 0.990) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
