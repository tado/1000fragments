uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.19 + t * 1.59 + ph) * 0.7;
    float wb = sin(p.y * 7.19 - t * 0.52 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.47), cos(time * 0.91)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.04 / 3.1415927, 1.16 / r - time * 1.48);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.32, vec3(0.57, 0.49, 0.47), vec3(0.50, 0.43, 0.48), vec3(1.22, 0.89, 1.00), vec3(0.27, 0.33, 0.56));
	col *= clamp(r * 1.69, 0.0, 1.0);
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
