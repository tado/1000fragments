uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.16 * cos(sa * 7.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 18.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 1.11 / r + time * 2.19);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.34, 0.24, 0.46) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.87, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
