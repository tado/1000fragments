uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.83 + t * 3.73 + ph) + sin(p.y * 8.43 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.43 / 3.1415927, 0.59 / r - time * 2.13);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.98 + time * 0.03);
	col *= clamp(r * 1.24, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
