uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.28 + 0.23 * sin(t * 1.53)) + vec2(-0.33, 0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.98 / 3.1415927, 0.60 / r + time * 0.68);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.36);
	col *= clamp(r * 1.89, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.43 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
