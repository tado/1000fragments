uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(0.18 + 0.3 * sin(t * 0.34 + ph), 0.70 + 0.3 * cos(t * 0.49 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.75 / 3.1415927, 0.37 / r + time * 1.56);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.04, vec3(0.57, 0.48, 0.52), vec3(0.34, 0.35, 0.48), vec3(0.84, 1.35, 0.84), vec3(0.99, 0.63, 0.58));
	col *= clamp(r * 1.93, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.34 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
