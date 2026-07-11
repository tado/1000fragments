uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.92 - t * 8.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.90 / 3.1415927, 1.11 / r + time * 0.82);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.15 + time * 0.25);
	col *= clamp(r * 1.34, 0.0, 1.0);
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
