uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.21 * cos(sa * 3.0 + t * 2.89 + ph);
    v = sin((sr - petal) * 8.18);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 0.41 / r + time * 1.42);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.74, 0.58, 0.29) * (0.21 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.81, 0.0, 1.0);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.68 + time * 14.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
