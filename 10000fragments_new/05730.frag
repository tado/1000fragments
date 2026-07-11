uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.24 * cos(sa * 7.0 + t * 2.36 + ph);
    v = sin((sr - petal) * 12.41);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 0.98 / r - time * 2.79);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.15, vec3(0.58, 0.52, 0.57), vec3(0.32, 0.30, 0.36), vec3(1.12, 0.83, 1.37), vec3(0.96, 0.48, 0.02));
	col *= clamp(r * 1.38, 0.0, 1.0);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 0.93 + time * 12.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
