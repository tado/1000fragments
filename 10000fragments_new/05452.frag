uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.47; vec2 jc = vec2(0.06 + 0.3 * sin(t * 0.87 + ph), -0.28 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 0.61 / r - time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.45 + time * 0.15);
	col *= clamp(r * 2.01, 0.0, 1.0);
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 1.93 + time * 17.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
