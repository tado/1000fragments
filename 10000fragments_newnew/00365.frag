uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.55 + sr * 10.65 - t * 1.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 1.41)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 1.24 / r - time * 0.79);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.26, vec3(0.40, 0.53, 0.53), vec3(0.42, 0.43, 0.32), vec3(1.39, 1.36, 1.13), vec3(0.97, 0.43, 0.76));
	col *= clamp(r * 1.03, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
