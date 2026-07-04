uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.03 + t * 1.03 + ph) + sin(p.y * 13.53 - t * 1.03 + ph)
        + sin((p.x + p.y) * 2.64 + t * 1.03 + ph) + sin(length(p) * 5.98 - t * 1.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.87 / 3.1415927, 0.61 / r - time * 0.97);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.22 + time * 0.18);
	col *= clamp(r * 2.63, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
