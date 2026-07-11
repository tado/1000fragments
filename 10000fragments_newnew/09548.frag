uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.30 * cos(sa * 8.0 + t * 1.28 + ph);
    v = sin((sr - petal) * 16.77);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 1.27 / r + time * 2.15);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.37, 0.05), vec3(0.94, 0.56, 0.44), cc);
	col *= clamp(r * 1.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
