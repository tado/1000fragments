uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.17 + t * 3.72 + ph) * 0.7;
    float wb = sin(p.y * 9.03 - t * 0.88 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.36;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.71 / 3.1415927, 1.04 / r + time * 1.54);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.49 + time * 0.16, vec3(0.57, 0.41, 0.59), vec3(0.31, 0.44, 0.43), vec3(0.79, 1.36, 1.23), vec3(0.64, 0.75, 0.44));
	col *= clamp(r * 1.40, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
