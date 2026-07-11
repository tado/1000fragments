uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.20 * cos(sa * 8.0 + t * 0.94 + ph);
    v = sin((sr - petal) * 13.35);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.29;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 0.89 / r + time * 1.51);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.30, vec3(0.40, 0.55, 0.56), vec3(0.41, 0.38, 0.32), vec3(1.30, 1.09, 0.74), vec3(0.36, 0.93, 0.35));
	col *= clamp(r * 2.06, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.37 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
