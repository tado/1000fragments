uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.67; vec2 jc = vec2(-0.00 + 0.3 * sin(t * 1.04 + ph), 0.42 + 0.3 * cos(t * 1.72 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 0.83)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 0.94 / r + time * 1.42);
	tv.x += tv.y * 0.14;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.06, vec3(0.44, 0.55, 0.52), vec3(0.48, 0.37, 0.31), vec3(0.87, 1.27, 1.04), vec3(0.38, 0.21, 0.60));
	col *= clamp(r * 1.88, 0.0, 1.0);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.61 + time * 7.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
