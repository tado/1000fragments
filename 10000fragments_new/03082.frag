uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.10; vec2 jc = vec2(0.31 + 0.3 * sin(t * 1.32 + ph), -0.53 + 0.3 * cos(t * 0.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.92), cos(time * 0.88)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.71 / r + time * 1.13);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.01);
	col *= clamp(r * 2.13, 0.0, 1.0);
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
