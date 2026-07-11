uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.21 * cos(sa * 3.0 + t * 1.54 + ph);
    v = sin((sr - petal) * 12.32);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.44 / 3.1415927, 0.70 / r - time * 1.04);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.30, vec3(0.44, 0.41, 0.45), vec3(0.45, 0.49, 0.33), vec3(1.27, 0.81, 0.81), vec3(0.80, 0.84, 0.46));
	col *= clamp(r * 1.63, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
