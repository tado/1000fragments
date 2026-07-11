uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.99 + 0.28 * sin(t * 0.96)) + vec2(-0.58, 0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.33 / 3.1415927, 1.38 / r + time * 0.81);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.93 + time * 0.34);
	col *= clamp(r * 2.25, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
