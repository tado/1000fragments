uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.82 + t * 0.63 + ph) * 0.7;
    float wb = sin(p.y * 8.71 - t * 2.06 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.36;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.08), cos(time * 1.40)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.75 / 3.1415927, 1.26 / r - time * 0.60);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.01, vec3(0.58, 0.50, 0.45), vec3(0.43, 0.50, 0.36), vec3(1.23, 0.79, 1.13), vec3(0.13, 0.05, 0.72));
	col *= clamp(r * 1.06, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
