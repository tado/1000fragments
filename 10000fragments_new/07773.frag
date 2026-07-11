uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.49 + t * 2.33 + ph) * 0.7;
    float wb = sin(p.y * 17.40 - t * 3.39 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.22), cos(time * 0.53)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.80 / 3.1415927, 0.68 / r - time * 2.80);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.11, vec3(0.59, 0.55, 0.55), vec3(0.44, 0.34, 0.37), vec3(1.11, 0.86, 1.37), vec3(0.21, 0.07, 0.97));
	col *= clamp(r * 1.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
