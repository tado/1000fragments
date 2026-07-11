uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.69 * sin(mf + 3.0) + ph), cos(t * 2.11 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.72 / 3.1415927, 0.31 / r + time * 2.49);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.19, vec3(0.46, 0.54, 0.43), vec3(0.43, 0.41, 0.39), vec3(1.15, 1.37, 1.15), vec3(0.22, 1.00, 0.03));
	col *= clamp(r * 1.21, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
