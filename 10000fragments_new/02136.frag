uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.88 + 0.26 * sin(t * 1.03)) + vec2(-0.49, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.10 / 3.1415927, 1.22 / r + time * 2.94);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.30, vec3(0.45, 0.51, 0.52), vec3(0.37, 0.32, 0.46), vec3(0.80, 1.12, 1.38), vec3(0.69, 0.86, 0.52));
	col *= clamp(r * 2.53, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
