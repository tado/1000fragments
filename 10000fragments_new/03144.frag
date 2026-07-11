uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.12 + t * 3.99 + ph) * 0.7;
    float wb = sin(p.y * 17.31 - t * 3.54 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.13 / 3.1415927, 0.59 / r - time * 0.58);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.32, vec3(0.47, 0.56, 0.58), vec3(0.40, 0.42, 0.32), vec3(0.87, 1.39, 0.78), vec3(0.97, 0.48, 0.15));
	col *= clamp(r * 1.11, 0.0, 1.0);
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
