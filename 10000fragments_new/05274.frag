uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.15 + 0.3 * sin(t * 1.69 + ph), -0.76 + 0.3 * cos(t * 1.64 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 0.91)) * 0.06;
	float an = atan(p.y, p.x) + time * -0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.40 / 3.1415927, 0.66 / r - time * 2.00);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.46 + time * 0.22, vec3(0.54, 0.48, 0.48), vec3(0.45, 0.49, 0.44), vec3(1.20, 1.10, 1.03), vec3(0.50, 0.96, 0.06));
	col *= clamp(r * 1.03, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
