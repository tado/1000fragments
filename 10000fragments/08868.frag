uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 2.44 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.38 / 3.1415927, 0.72 / r - time * 1.40);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.60 + time * 0.03);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.39 + time * 17.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
