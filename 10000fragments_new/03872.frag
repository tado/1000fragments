uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.71 + t * 1.82 + ph) * 0.7;
    float wb = sin(p.y * 10.34 - t * 1.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.56), cos(time * 0.97)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 1.45 / r + time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.06, vec3(0.58, 0.57, 0.42), vec3(0.38, 0.37, 0.41), vec3(1.25, 0.86, 0.75), vec3(0.21, 0.24, 0.00));
	col *= clamp(r * 2.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
