uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(0.30 + 0.3 * sin(t * 0.47 + ph), 0.27 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.46)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.44 / 3.1415927, 1.38 / r + time * 2.74);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.45 + time * 0.11);
	col *= clamp(r * 1.34, 0.0, 1.0);
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
