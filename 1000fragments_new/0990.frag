uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.91 + 0.48 * sin(t * 1.01)) + vec2(-0.21, 0.20) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 0.99)) * 0.21;
	float an = atan(p.y, p.x) + time * 0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.42 / 3.1415927, 1.30 / r + time * 2.60);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.48 + time * 0.03, vec3(0.59, 0.58, 0.44), vec3(0.49, 0.35, 0.46), vec3(0.72, 1.00, 0.90), vec3(0.26, 0.97, 0.74));
	col *= clamp(r * 2.37, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.30 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
