uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.92 + t * 4.69 + ph) + sin(p.y * 3.15 - t * 5.38 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.32 / 3.1415927, 1.28 / r + time * 1.28);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.25 + time * 0.15);
	col *= clamp(r * 2.65, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
