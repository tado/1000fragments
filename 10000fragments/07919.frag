uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.70; vec2 jc = vec2(-0.73 + 0.3 * sin(t * 0.70 + ph), -0.55 + 0.3 * cos(t * 0.54 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.07), cos(time * 1.35)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 1.12 / r - time * 0.98);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.44 + time * 0.00);
	col *= clamp(r * 2.07, 0.0, 1.0);
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
