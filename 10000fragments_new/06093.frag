uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.22 * cos(sa * 7.0 + t * 2.57 + ph);
    v = sin((sr - petal) * 14.52);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.16 / 3.1415927, 0.90 / r + time * 2.21);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.25, 0.83, 1.41) + vec3(0.01, 0.21, 0.24);
	col *= clamp(r * 2.66, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
