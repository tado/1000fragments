uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.35 + 0.22 * sin(t * 1.05)) + vec2(-0.46, -0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.76), cos(time * 1.19)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 1.18 / r + time * 2.15);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.30, vec3(0.53, 0.55, 0.49), vec3(0.37, 0.46, 0.37), vec3(1.29, 1.17, 0.81), vec3(0.65, 0.84, 0.83));
	col *= clamp(r * 1.94, 0.0, 1.0);
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
