uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.09; vec2 jc = vec2(-0.07 + 0.3 * sin(t * 0.44 + ph), 0.56 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.58), cos(time * 0.92)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 1.48 / r - time * 1.53);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.21, vec3(0.40, 0.59, 0.44), vec3(0.37, 0.49, 0.47), vec3(1.18, 0.88, 1.36), vec3(0.56, 0.97, 0.36));
	col *= clamp(r * 1.42, 0.0, 1.0);
	col = fract(col * 1.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
