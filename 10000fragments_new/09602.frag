uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.82 + 0.34 * sin(t * 0.77)) + vec2(-0.79, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.83), cos(time * 0.97)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.51;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.64 / 3.1415927, 1.00 / r - time * 1.73);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.09, vec3(0.44, 0.51, 0.46), vec3(0.49, 0.35, 0.46), vec3(0.86, 0.86, 1.17), vec3(0.13, 0.52, 0.58));
	col *= clamp(r * 1.80, 0.0, 1.0);
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
