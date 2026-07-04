uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.41 + t * 0.63 + ph) + sin(p.y * 2.05 - t * 3.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.56), cos(time * 0.45)) * 0.13;
	float an = atan(p.y, p.x) + time * -0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 1.11 / r - time * 2.29);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.49 + time * 0.39);
	col *= clamp(r * 1.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
